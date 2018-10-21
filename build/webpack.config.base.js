const path = require('path')
const vueLoaderOptions = require('./vue-loader.config')

const config = {
  mode: process.env.NODE_ENV || 'production',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader',
        options: vueLoaderOptions
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      // {
      //   test: /.js$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.(gif|jpg|jpeg|svg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              // fallback 默认值就是 file-loader，当文件大小大于 1024b时，使用 file-loader
              fallback: 'file-loader',
              name: 'resources/[path][name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
