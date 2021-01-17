const webpack = require("webpack");

module.exports = {
  // assetsDir: '.',
  publicPath:'./',
  //2.起别名
  configureWebpack:{
    resolve:{
      alias:{
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'node_modules': '@/node_modules',
        'static': '@/static'
      }
    },
    devServer: {
      open: true,
      port: 8080
    }
  }

}