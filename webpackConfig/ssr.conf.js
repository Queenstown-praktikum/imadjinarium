const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const _path = (alias) => path.resolve(__dirname, alias);

module.exports = {
  entry: _path('../client/core/routing/routing.tsx'),
  target: 'node',
  mode: 'development',
  output: {
    filename: 'ssr.bundle.js',
    path: _path('../dist'),
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    alias: {
      // Тут будут алиасы к папкам
      // 'Components': _path('src/Components/'),
      ['ui-kit']: _path('../client/ui-kit/'),
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
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'client/core/service-worker/manifest.json', to: _path('../dist') },
        { from: 'public/favicon.ico', to: _path('../dist') },
        { from: 'public/logo192.png', to: _path('../dist') },
        { from: 'public/logo512.png', to: _path('../dist') },
        { from: 'assets', to: _path('../dist') },
      ],
    }),
  ],
  externals: [nodeExternals()],
};
