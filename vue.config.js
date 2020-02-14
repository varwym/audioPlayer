const path = require('path')
module.exports = {
    configureWebpack: {
        resolve: {
          alias: {
            assets: path.join(__dirname, 'src/assets'),
          }
        }
      },
    devServer: {
        host: '0.0.0.0',
        port: 8080
    }
}