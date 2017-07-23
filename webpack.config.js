const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: ['./js/entry.js', './style/main.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new ExtractTextPlugin("[name].css"),
  ]
}