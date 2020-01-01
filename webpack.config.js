var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'www')
const PHASER_DIR = path.join(__dirname, '/node_modules/phaser/')
const phaser = path.join(PHASER_DIR, 'dist/phaser.js')


module.exports = {
  context: __dirname,
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, './src/index.ts')],
    vendor: ['phaser']
  },
  mode:"development",
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
      { test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/" },
      { test: /phaser\.js$/, loader: "expose-loader?Phaser" }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
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
