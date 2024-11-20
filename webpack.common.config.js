const HtmlPlugin = require('html-webpack-plugin');
const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    popup: path.resolve('src/popup/index.tsx'),
    options: path.resolve('src/options/options.tsx'),
    background: path.resolve('src/background/background.ts'),
    contentScript: path.resolve('src/contentScript/contentScript.ts'),
    dashboard: path.resolve('src/dashboard/index.ts'),
    newTab: path.resolve('src/tabs/index.tsx')
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions:{
                ident: 'postcss',
                plugins: [tailwindcss, autoprefixer],
              }
            }
          }
        ],
        test: /\.css$/i,
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve('src/static'), to: path.resolve('dist/') },
      ],
    }),
    ...getHtmlPlugins(
      ['popup', 'options', 'dashboard', 'newTab']
    )
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

function getHtmlPlugins(chunks) {
    return chunks.map((chunk) => new HtmlPlugin({
      title: "Tube Mellow",
      filename: `${chunk}.html`,
      chunks: [chunk]
    }))
}