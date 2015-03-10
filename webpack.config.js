var path = require('path')

module.exports = {
  entry: {
    'example/example.es5': './example/example.es6'
  },

  output: {
    filename: "[name].js"
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?experimental'}
    ]
  }
}
