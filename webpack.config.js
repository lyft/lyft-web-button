// dependencies
var webpack = require('webpack');
var path = require('path');

// webpack development configuration
var webpackConfig = {
  entry: {
    lyftWebButton: './webpack.entry.lyftWebButton.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015']
          ]
        }
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }, {
        exclude: /node_modules/,
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

// webpack production configuration
if (process.env.NODE_ENV === 'production') {
  // filename
  webpackConfig.output.filename = '[name].min.js';
  // plugins
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  );
}

module.exports = webpackConfig;
