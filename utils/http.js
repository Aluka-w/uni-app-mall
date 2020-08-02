/**
 * @description  封装请求
 */

/**
 * http 请求封装
 * @param {string} url  请求地址  
 * @param {string} method  请求方式  
 * @param {Object} header  请求头 
 * @param {Object} data  请求数据
 * @param {function} complete  请求完成 
 * @param {Boolean} hideLoading  请求动画
 */
const http = (params) => {
  let url = params.url;
  let method = params.methods || 'GET';
  let header = params.header || null;
  let data = params.data || null;

  // 请求方式 GET / POST
  method = method.toUpperCase();
  if (method === "POST" && !header) {
    header = {
      "content-type": "application-www-form-urlencoded"
    }
  }

  // 发起请求，加载动画
  if (!params.hideLoading) {
    uni.showLoading({
      title: "加载中...",
      mask: false
    });
  }
  // 发起网络请求
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      method: method,
      header: header,
      data: data,
      success: res => {
        if (res.statusCode && res.statusCode != 200) { // api错误
          uni.showModal({
            content: res.msg
          })
          return;
        }
        resolve(res.data)
      },
      fail: (e) => {
        uni.showModal({
          content: e.meg
        })
        reject(e.data)
      },
      complete: () => {
        uni.hideLoading();
        return;
      }
    })
  })
}

module.exports = http
