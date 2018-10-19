const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|svg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              // fallback 默认值就是 file-loader，当文件大小大于 1024b时，使用 file-loader
              fallback: 'file-loader',
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.mode = 'development'
  config.devtool = '#cheap-module-eval-source-map'
  config.output.filename = '[name[.[chunkhash:8].js'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    open: true, // webpack 启动后自动打开网站
    hot: true
  }
  config.module.rules.push({
    test: /.(styl|stylus)$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.mode = 'production'
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.module.rules.push({
    test: /.(styl|stylus)$/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    })
  })
  config.plugins.push(
    new ExtractPlugin('styles.[hash:8].css')
  )
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}

module.exports = config
