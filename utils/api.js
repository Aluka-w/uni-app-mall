/**
 * @description  项目接口
 */


let domain = ""

//  判断环境
if (process.env.NODE_ENV === 'development') {
  domain = "https://uniapp-interface.herokuapp.com/"
}
if (process.env.NODE_ENV === 'production') {
  domain = "https://uniapp-interface.herokuapp.com/"
}

const api = {
  // 获取首页数据
  getMallData: domain + "api/profiles/mall_list",
}

module.exports = api
