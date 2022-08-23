/**
 * Базовая когфигурация
 * Тут общие настройки как для PRODUCTION так и для DEVELOPMENT
 */

// import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const _path = (alias) => path.resolve(__dirname, alias);

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: ['@gatsbyjs/webpack-hot-middleware/client?path=/__webpack_hmr', _path('../index.tsx')],
  output: {
    // filename: 'main-[hash:4].js',
    filename: 'client.bundle.js',
    path: _path('../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    alias: {
      // Тут будут алиасы к папкам
      // 'Components': _path('src/Components/'),
      ['ui-kit']: _path('../src/ui-kit/'),
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
          MiniCssExtractPlugin.loader,
          { loader: 'css-modules-typescript-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                // localIdentName: '[local]--[hash:base64]',
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
    // new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new ReactRefreshPlugin({
      overlay: { sockIntegration: 'whm' },
    }),
    new MiniCssExtractPlugin(),
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
