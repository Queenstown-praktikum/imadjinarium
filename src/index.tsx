import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import TestApp from './TestApp';
import { store } from './redux/store';

// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
window.__PRELOADED_STATE__ = store;

// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
delete window.__PRELOADED_STATE__;

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <Provider store={store}>
    <BrowserRouter>
      <TestApp />
    </BrowserRouter>
  </Provider>,
);
