const webpack = require('webpack');
const {resolve} = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.MODE === 'PROD';

const cssFilename = '../../css/bundle/[name].css';

let plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: {
            warnings: false,
            screw_ie8: true,
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
            comments: false,
        }
    }),
    new ExtractTextPlugin({ filename: cssFilename, disable: !isProd, allChunks: true }),
    new webpack.DefinePlugin({
        '__DEV__': !isProd,
        'process.env': {
            MODE: isProd ? JSON.stringify('PROD') : JSON.stringify('DEV')
        }
    }),
    new SWPrecacheWebpackPlugin({
            // By default, a cache-busting query parameter is appended to requests
            // used to populate the caches, to ensure the responses are fresh.
            // If a URL is already hashed by Webpack, then there is no concern
            // about it being stale, and the cache-busting can be skipped.
            cacheId: 'the-magic-cache',
            filepath: resolve(__dirname, './public/service-worker.js'),
            minify: false,
            // For unknown URLs, fallback to the index page
            navigateFallback: '/',
            mergeStaticsConfig: true,
            stripPrefixMulti: {
                [resolve(__dirname, './public/')]: '',
            },
            staticFileGlobs: [
                resolve(__dirname, './public/index.html'),
                resolve(__dirname, './public/images/*.png'),
                resolve(__dirname, './public/images/icons/**.*'),
                resolve(__dirname, './public/javascripts/*.js'),
                resolve(__dirname, './public/javascripts/bundle/*.js'),
                resolve(__dirname, './public/javascripts/bundle/media/**.*'),
                resolve(__dirname, './public/css/*.css'),
                resolve(__dirname, './public/css/bundle/*.css'),
            ],
            // offline support
            runtimeCaching: [{
                urlPattern: /\/api\/speakers/,
                handler: 'cacheFirst'
            }, {
                urlPattern: /\/api\/talks/,
                handler: 'cacheFirst'
            }],
            importScripts: ['../../push-support.js','../../sync-support.js']
        }),
];

module.exports = {
    output: {
        path: resolve(__dirname, './public/javascripts/bundle/'),
        publicPath: '/javascripts/bundle/',
        filename: 'devoxxapp.js',
        library: 'devoxxapp',
        libraryTarget: 'umd'
    },
    entry: {
        'devoxxapp': ['./src/index.js']
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            resolve(__dirname, 'node_modules'),
            resolve(__dirname, 'src')
        ]
    },
    devServer: {
        port: process.env.DEV_SERVER_PORT || 3000
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

                  {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [{loader: require.resolve('css-loader'), options: {
            importLoaders: 1,
            minimize: true,
            sourceMap: true,
          }}]
        })
      },
      {
        test: /\.scss$/,
        include: [
          resolve(__dirname, "style"),
          resolve(__dirname, 'node_modules'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [{loader: require.resolve('css-loader')}, {loader: require.resolve('sass-loader'),
          options: {
            importLoaders: 1,
            minimize: true,
            sourceMap: true,
          }}]
        })
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=400000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader' ,
        options: {
            outputPath: 'media/'
          }
      },
        ]
    },
    plugins
};