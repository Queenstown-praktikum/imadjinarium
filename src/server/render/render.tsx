import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

export function render(req: Request, res: Response) {
  const { devMiddleware } = res.locals.webpack;
  const jsonWebpackStats = devMiddleware.stats.toJson();
  const { assetsByChunkName } = jsonWebpackStats;
  // const css = assetsByChunkName.main[0];
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

  const html = fs.readFileSync(path.join(__dirname, '../../../public/index.html'), {
    encoding: 'utf-8',
  });

  return res.status(200).send(
    html.replace(
      '<div id="root"></div>',
      `<div id="root">${reactHtml}</div>
                   <script src='${script}'></script>`,
    ),
  );
}
