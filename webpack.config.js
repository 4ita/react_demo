const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  target: 'web',
  mode: isDevelopment ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
     { test: /\.(ts|js)x?$/, loader: "ts-loader" },
      // {
      //   test: [ /\.jsx?$/],
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         presets: ['@babel/preset-env', '@babel/preset-react'],
      //         // plugins: ['@babel/plugin-transform-runtime']
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  devServer: {
    hot: true,
    watchFiles: [path.resolve(__dirname, 'src')],
    liveReload: true,
    historyApiFallback: true,
  },
};
