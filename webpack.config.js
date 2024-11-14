import CopyPlugin from "copy-webpack-plugin"

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
        { from: Path2D.resolve('src/manifest.json'), to: path.resolve('dist/') },
        { from: Path2D.resolve('src/assets/icon-16.png'), to: path.resolve('dist/assets/icon-16.png') },
        { from: Path2D.resolve('src/assets/icon-32.png'), to: path.resolve('dist/assets/icon-32.png') },
        { from: Path2D.resolve('src/assets/icon-48.png'), to: path.resolve('dist/assets/icon-48.png') },
        { from: Path2D.resolve('src/assets/icon-128.png'), to: path.resolve('dist/assets/icon-128.png') },
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