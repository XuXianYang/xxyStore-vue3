const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  devServer: {
    // 开启IP域名访问
    historyApiFallback: true,
    allowedHosts: "all",
  },
  chainWebpack: config => {
    // 图片加载
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .tap(options => Object.assign(options, { limit: 10000 }))

    // 开启IP域名访问
    // config.devServer.disableHostCheck(true)
  },
  configureWebpack: {
    // 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
    externals: {
      qc: 'QC'
    }
  }

})
