/* global module, __dirname */
const Webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const IS_DEV = process.env.NODE_ENV === 'development'
const plugins = [

  new Webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': IS_DEV ? '"development"' : '"production"'
    }
  })
]

if (IS_DEV) {
  plugins.push(
    new Webpack.HotModuleReplacementPlugin()
  )
}

const ENTRIES = {
  metroApp: './src/index.js'
}

module.exports = {
  devtool: IS_DEV ? 'source-map' : false,
  entry: ENTRIES,
  mode: IS_DEV ? 'development' : 'production',
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: '[name].bundle.js',
    libraryTarget: 'var'
  },
  optimization: {
    minimizer: IS_DEV ? [] : [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
          },
          output: {
            comments: false
          },
          warnings: false,
          nameCache: null,
          toplevel: false,
          ie8: false
        }
      })
    ]
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'static'),
      path.join(__dirname, 'node_modules')
    ],
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true,
    hot: true,
    open: true,
    host: '127.0.0.1',
    port: 1337
  },
  plugins,
  externals: {
    'babel-polyfill': 'babel-polyfill',
    'lodash': '_',
    'prop-types': 'PropTypes',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'redux': 'Redux',
    'redux-thunk': 'ReduxThunk'
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['.json', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      }, {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve('src')
        ]
      }, {
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.(jpe?g|png|gif|svg)/,
        loader: 'url-loader',
        query: {
          hash: 'sha512',
          digest: 'hex',
          name: '[name]-[hash].[ext]',
          limit: 17000
        }
      }
    ]
  }
}
