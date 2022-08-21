const path = require('path');
const nodeExternals = require('webpack-node-externals');

const _path = (alias) => path.resolve(__dirname, alias);

module.exports = {
  entry: _path('../src/TestApp.tsx'),
  target: 'node',
  mode: 'development',
  output: {
    // filename: 'main-[hash:4].js',
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
  externals: [nodeExternals()],
};
