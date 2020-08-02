# uni-app-mall
uni-app实现商城 demo（app，小程序，h5）

##  工具类

### HBuilder X（APP 版）

#### HbuilderX 创建项目

1. manifest.json：修改项目在各端配置
2. HBuilderX 和 Cli 生成的项目在包的引用，资源引入等都不一样，建议 HBuilderX

## 语法类

#### @引入路径（css， js，图片，video，@指向项目根目录）

1. 推荐使用：`@/static/logo.png`，可在 template，script，style 内使用绝对路径，坑最少

#### 生命周期

1. 应用生命周期：仅可在App.vue中监听
2. 页面生命周期

#### 路由

1. 新增页面：在 pages.json 中配置新页面路径及页面样式（Vue-Router可实现类 vue 路由）
2. 路由跳转：navigator 和 API
3. 页面栈：
      1. 打开新页面：     uni.navigateTo
      2. 重定向：         uni.redirectTo
      3. 返回：          uni.navigateBack
      4. tab 切换：      uni.switchTab
      5. 重新加载：      uni.reLaunch

#### 运行环境

1. `process.env.NODE_ENV` 判断环境，HX 中运行时开发环境，发行是 生产环境
2. 不同平台配置统一环境：package.json ；不同平台配置不同环境： vue-config.js

#### 判断平台

1. 编译期（条件编译）：代码只打包到相应环境

      ```js
        // #ifdef H5
            alert("只有h5平台才有alert方法")
        // #endif
      ```

2. 运行期：代码已经打入各个环境包中

      ```js
        switch(uni.getSystemInfoSync().platform){
            case 'android':
               console.log('运行Android上')
               break;
            case 'ios':
               console.log('运行iOS上')
               break;
            default:
               console.log('运行在开发者工具上')
               break;
        }
      ```
      
#### 页面样式和布局

1. 使用 flex 布局，支持 px 和 rpx， 建议 upx、项目开始前务必看一下原文档，适配问题（尺寸单位）
2. `App.vue` 全局样式，各个页面的是局部样式，局部可覆盖全局

3. CSS 变量
      
      ```
        --status-bar-height：系统状态栏高度
        --window-top：内容区域距离顶部的距离（NavigationBar）
        --window-bottom：内容区域距离底部的距离（TabBar）
        
        //  状态栏高度
        .status_bar {
            height: var(--status-bar-height);
            width: 100%;
        }
        // 放一个向上箭头，它距离底部tabbar上浮10px
        .toTop {
            bottom: calc(var(--window-bottom) + 10px)
        }
      ```

4. 固定值：NavigationBar，TabBar（各平台不一致，不可改）

#### 背景图片：css 中推荐网络图片，40kb 以下转 base64

#### <template/> 和 <block/> 只作为包装元素，不会渲染

####  ES6 支持

1. 支持 async/await
2. ios数组不支持`values` `includes` 方法

#### 小程序组件性能不如 vue 组件（不推荐各端共用小程序组件）

### Vue 注意事项

- h5 支持所有 vue 语法，app 和小程序不行
- 若需要禁止蒙版下的页面滚动，可使用 `<view class="mask" @touchmove.stop.prevent="moveHandle"></view>`

### App 兼容问题

1. 沉浸式状态栏（非沉浸式）

      1. app 才有表示电量，手机信号等的状态栏，状态栏背景色与下面内容是否一致

2. 取消系统默认顶部导航

      ```
        // page.json
        {
          "pages": [{
        			"path": "pages/tabbar/home/index",
        			"style": {
        				"navigationBarTitleText": "首页",
        				"app-plus": { // 取消默认的状态栏
        					"titleNView": false,
        					"bounce": "none" // 下拉回弹
        				}
        			}
        		}
          ]
        }
      ```

3. 样式

  ```css
    // app 的时候时刻记得兼容状态栏的高度
    // --status-bar-height 为顶部高度
    // 条件编译 设置离顶部的高度
    /*  #ifdef  APP-PLUS  */
    top: var(--status-bar-height);
    /*  #endif  */
  ```

4. 请求方法的封装

5. 商品瀑布流布局

6. tab实现
