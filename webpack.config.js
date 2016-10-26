/* dependencies */
var webpack = require('webpack');

/* webpack configuration */
var webpackConfig = {
  entry: {
    lyftWebButton: './src/lyftWebButton.js'
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

/* production */
if (process.env.NODE_ENV === 'production') {
  /* filename */
  webpackConfig.output.filename = '[name].min.js';
  /* uglifyJsPlugin */
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
