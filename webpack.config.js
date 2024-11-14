const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",  
  entry: "/src/test.tsx",
  module: {  
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx$/,
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve('src/manifest.json'), to: path.resolve('dist/') },
        { from: path.resolve('src/assets/icon-16.png'), to: path.resolve('dist/') },
        { from: path.resolve('src/assets/icon-32.png'), to: path.resolve('dist/') },
        { from: path.resolve('src/assets/icon-48.png'), to: path.resolve('dist/') },
        { from: path.resolve('src/assets/icon-128.png'), to: path.resolve('dist/') },
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: { 
    filename: "index.js"
  }
}