const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackMerge = require('webpack-merge')

const ROOTPATH = path.resolve(__dirname)
const ENV = (process.env.NODE_ENV || 'prod').trim()

const projectTitle = '${artifactId}'

const getCommonConfig = (dllName) => {
  const extractCSS = new ExtractTextPlugin('[name].[hash].css')
  return commonConfig = {
    resolve: {
      modules: [
        'node_modules',
        path.resolve(ROOTPATH, 'src')
      ],
      extensions: ['.ts', '.js', '.json', '.css', '.less', '.html']
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
          loader: 'file-loader?name=assets/[name]-[hash:6].[ext]'
        },
        {
          test: /favicon.ico$/,
          loader: 'file-loader?name=/[name].[ext]'
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [path.join(ROOTPATH, 'src', 'assets'), path.join(ROOTPATH, 'node_modules')]
        },
        {
          test: /\.less$/,
          use: ['to-string-loader', 'css-loader', 'less-loader'],
          exclude: [path.join(ROOTPATH, 'src', 'assets'), path.join(ROOTPATH, 'node_modules')]
        },
        {
          test: /\.css$/,
          loader: extractCSS.extract({ fallback: 'style-loader', use: 'css-loader' }),
          include: [path.join(ROOTPATH, 'src', 'assets'), path.join(ROOTPATH, 'node_modules')]
        },
        {
          test: /\.less$/,
          loader: extractCSS.extract({ fallback: 'style-loader', use: ['css-loader', 'less-loader'] }),
          include: [path.join(ROOTPATH, 'src', 'assets'), path.join(ROOTPATH, 'node_modules')]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [path.join(ROOTPATH, 'src', 'index.html')]
        }
      ],
      exprContextCritical: false
    },
    plugins: [
      new CleanWebpackPlugin(
        [path.join(ROOTPATH, ENV == 'dev' ? 'dist' : 'dist', '*')],
        { root: ROOTPATH }
      ),
      new webpack.NoEmitOnErrorsPlugin(),
      extractCSS,
      new HtmlWebpackPlugin({
        inject: true,
        title: projectTitle + ' ' + (ENV == 'dev' ? ' Development Mode' : ''),
        filename: path.join(ROOTPATH, 'index.jsp'),
        template: path.join(ROOTPATH, 'src', 'index.html'),
        env: ENV,
        dllName: dllName
      })
    ]
  }
}

const getDevConfig = () => {
  const Manifest = require('./dll/manifest.json')

  return webpackMerge(getCommonConfig(Manifest.name), {
    devtool: 'source-map',
    entry: {
      'main': './src/main.ts'
    },
    output: {
      path: path.join(ROOTPATH, 'dist'),
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[id].[hash].chunk.js',
      sourceMapFilename: '[file].map',
      publicPath: '/dist/'
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(ROOTPATH, 'dist'),
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader?configFileName=tsconfig.json',
            'angular-router-loader',
            'angular2-template-loader',
            'source-map-loader',
            'tslint-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: ROOTPATH,
        manifest: Manifest
      }),
      new CopyWebpackPlugin([
        { from: path.join(ROOTPATH, 'dll'), to: 'dll' }
      ])
    ]
  })
}

const getDllConfig = () => {
  const extractDllCSS = new ExtractTextPlugin({ filename: '[name]_[hash].dll.css' })
  return {
    entry: {
      vendor: [
        './src/polyfills.ts',
        './src/vendor.ts'
      ]
    },
    output: {
      path: path.join(ROOTPATH, 'dll'),
      filename: '[name]_[hash].dll.js',
      library: '[name]_[hash]'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.less', '.html']
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
          loader: 'file-loader?name=assets/[name]-[hash:6].[ext]'
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [path.join(ROOTPATH, 'src', 'assets'), path.join(ROOTPATH, 'node_modules')]
        },
        {
          test: /\.less$/,
          use: ['to-string-loader', 'css-loader', 'less-loader'],
          exclude: [path.join(ROOTPATH, 'src', 'assets'), path.join(ROOTPATH, 'node_modules')]
        },
        {
          test: /\.css$/,
          loader: extractDllCSS.extract({ fallback: 'style-loader', use: 'css-loader' }),
          include: [path.join(ROOTPATH, 'src', 'assets'), path.join(ROOTPATH, 'node_modules')]
        },
        {
          test: /\.less$/,
          loader: extractDllCSS.extract({ fallback: 'style-loader', use: ['css-loader', 'less-loader'] }),
          include: [path.join(ROOTPATH, 'src', 'assets'), path.join(ROOTPATH, 'node_modules')]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [path.join(ROOTPATH, 'src', 'index.html')]
        },
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader?configFileName=tsconfig.json',
            'angular-router-loader',
            'angular2-template-loader'
          ]
        }
      ],
      exprContextCritical: false
    },
    plugins: [
      new CleanWebpackPlugin(
        [path.join(ROOTPATH, 'dll', '*')],
        { root: ROOTPATH }
      ),
      extractDllCSS,
      new webpack.DllPlugin({
        path: path.join(ROOTPATH, 'dll', 'manifest.json'),
        name: '[name]_[hash]',
        context: ROOTPATH
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: false
      })
    ]
  }
}

const getProdConfig = () => {
  return webpackMerge(getCommonConfig(''), {
    entry: {
      'main': './src/main.ts',
      vendor: [
        './src/polyfills.ts',
        './src/vendor.ts'
      ]
    },
    output: {
      path: path.join(ROOTPATH, 'dist'),
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[id].[hash].chunk.js',
      publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader?configFileName=tsconfig.json',
            'angular-router-loader',
            'angular2-template-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: false
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'commons.[hash].js',
        minChunks: 2
      })
    ]
  })
}

if (ENV === 'dev') {
  module.exports = getDevConfig()
} else if (ENV === 'prod') {
  module.exports = getProdConfig()
} else if (ENV === 'dll') {
  module.exports = getDllConfig()
}