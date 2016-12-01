// dependencies
var webpack = require('webpack');

// webpack development configuration
var webpackConfig = {
  entry: {
    lyftWebButton: './webpack.entry.lyftWebButton.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style!css'
    }]
  },
  plugins: []
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
