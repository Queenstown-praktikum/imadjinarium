import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
// @ts-ignore
import hotMiddleware from '@gatsbyjs/webpack-hot-middleware';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import config from '../../../webpackConfig/webpack.base.conf.js';
import { render } from './render';

const compiler = webpack({ ...config, mode: 'development' });

export default [
  devMiddleware(compiler, { serverSideRender: true, index: false, publicPath: config.output.publicPath }),
  hotMiddleware(compiler, {
    path: '/__webpack_hmr',
    log: false,
  }),
  render,
];
