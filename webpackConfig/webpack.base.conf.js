/**
 * Базовая когфигурация
 * Тут общие настройки как для PRODUCTION так и для DEVELOPMENT
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const _path = (alias) => path.resolve(__dirname, alias);

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: _path('../index.tsx'),
  output: {
    filename: 'main-[hash:4].js',
    path: _path('../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    alias: {
      // Тут будут алиасы к папкам
      // 'Components': _path('src/Components/'),
      ['ui-kit']: _path('../src/ui-kit/') 
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-modules-typescript-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64]',
              },
              sourceMap: true,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: _path('../public/index.html'),
      favicon: _path('../public/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
    new InjectManifest({
      swSrc: './src/core/service-worker/sw.js',
      swDest: 'sw.js',
      maximumFileSizeToCacheInBytes: 9000000,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/core/service-worker/manifest.json', to: _path('../dist') },
        { from: 'public/favicon.ico', to: _path('../dist') },
        { from: 'public/logo192.png', to: _path('../dist') },
        { from: 'public/logo512.png', to: _path('../dist') },
      ],
    }),
  ],
};
