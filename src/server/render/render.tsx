import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { renderFullPage } from './renderFullPage';

export function render(req: Request, res: Response) {
  const { devMiddleware } = res.locals.webpack;
  const jsonWebpackStats = devMiddleware.stats.toJson();
  const { assetsByChunkName } = jsonWebpackStats;
  const style = assetsByChunkName.main[0];
  const script = assetsByChunkName.main[1];

  delete require.cache[require.resolve('../../../dist/ssr.bundle.js')];

  // eslint-disable-next-line global-require,import/no-unresolved
  const App = require('../../../dist/ssr.bundle').default;

  const reactHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
  );

  // const html = fs.readFileSync(path.join(__dirname, '../../../public/index.html'), {
  //   encoding: 'utf-8',
  // });

  const preloadStore = store.getState();

  const html = renderFullPage(reactHtml, preloadStore, script, style);

  return res.status(200).send(html);
}
