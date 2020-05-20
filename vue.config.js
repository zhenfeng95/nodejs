/** @format */

const path = require('path')
const vConsolePlugin = require('vconsole-webpack-plugin')
const isProductionEnvFlag = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

let appVariable = null

if (process.env.NODE_ENV === 'production') {
  appVariable = require(path.resolve(__dirname, './env.production.js'))
} else {
  appVariable = require(path.resolve(__dirname, './env.developer.js'))
}

if (appVariable) {
  Object.keys(appVariable).forEach(key => {
    console.log(key)
    process.env[key] = appVariable[key]
  })
}

module.exports = {
  configureWebpack: {
    plugins: [
      !isProductionEnvFlag
        ? new vConsolePlugin({
            enable: true
          })
        : () => {}
    ]
  },
  // 项目部署的基本路径
  // 默认假设你的应用将会部署在域名的根部
  // 比如，https://www.vue-cli.com/
  //如果你的应用是部署在一个子路径下，那么你需要在这里指定子路径，比如，如果你部署在 https://www.my-vue.com/my-app/; 那么将这个值改为 “/my-app/”
  publicPath: '/manage/',

  //将构建好的文件输出到哪里 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  outputDir: 'dist',

  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: '',

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  // 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  // 如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'error'。这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
  lintOnSave: false,

  //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],

  //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,

  //是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@helper', resolve('src/helper'))
      .set('@views', resolve('src/views'))
      .set('@assets', resolve('src/assets'))
      .set('@router', resolve('src/router'))
      .set('@mixins', resolve('src/mixins'))
      .set('@components', resolve('src/components'))
      .set('@mock', resolve('src/mock'))
  },

  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,

  // 代理配置
  devServer: {
    host: '0.0.0.0',
    port: 9595, // 端口号
    https: true, // https:{type:Boolean}
    open: true, //配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
    // proxy: 'http://localhost:9595' // 配置跨域处理,只有一个代理

    // 配置多个代理
    proxy: {
      '/api': {
        target: 'https://way.jd.com', //目标主机
        ws: true, //代理的WebSockets
        changeOrigin: true, //需要虚拟主机站点
        pathRewrite: {
          '^/api': ''
        }
      },
      '/mock/*': {
        target: 'https://localhost:9595/manage',
        changeOrigin: true, // 设置这个参数可以避免跨域
        pathRewrite: {
          '^/mock': ''
        }
      }
    },
    before: require('./mock')
  },

  // 第三方插件选项
  // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
  pluginOptions: {}
}
