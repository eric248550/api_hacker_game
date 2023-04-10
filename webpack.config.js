
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],},
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    fallback: {
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream"),
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  experiments: {
    syncWebAssembly: true,
    layers: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), 
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      favicon: path.resolve(__dirname, "favicon.ico"),
      inject: false,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
    historyApiFallback: true,
    publicPath: '/', 
    host: '0.0.0.0',
      disableHostCheck: true,
    
  },
};
