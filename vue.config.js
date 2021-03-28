const path = require('path')

module.exports = {
  transpileDependencies: ['vuetify'],
  runtimeCompiler: true,
  outputDir: path.resolve(__dirname, '../server/public'),  
  devServer: {    
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  },
  configureWebpack: {    
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}
