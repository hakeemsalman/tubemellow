const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    popup: path.resolve('src/popup/popup.tsx')
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/i,
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve('src/manifest.json'), to: path.resolve('dist/') },
        { from: path.resolve('src/assets/icon-16.png'), to: path.resolve('dist/assets/') },
        { from: path.resolve('src/assets/icon-32.png'), to: path.resolve('dist/assets/') },
        { from: path.resolve('src/assets/icon-48.png'), to: path.resolve('dist/assets/') },
        { from: path.resolve('src/assets/icon-128.png'), to: path.resolve('dist/assets/') },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "Tube Mellow",
      filename: 'popup.html',
      chunks: ['popup']
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

}