/**
 * Конфигурация для DEVELOPMENT
 */
const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    port: 3000,
    host: '0.0.0.0',
    compress: true,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [],
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
});
