var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'www')
const PHASER_DIR = path.join(__dirname, '/node_modules/phaser/')
const phaser = path.join(PHASER_DIR, 'src/phaser.js')

module.exports = {
  context: __dirname,
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, './src/index.js')],
    vendor: ['phaser']
  },
  output: {
    pathinfo: true,
    path: BUILD_DIR,
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] }
    ]
  },
  resolve: {
    alias: {
      phaser: phaser
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/static'
      }
    ])
  ]
}
