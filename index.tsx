import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { reducer } from './client/redux/store';
import { UnexpectedErrorPage } from './client/pages/unexpected-error/unexpected-error.page';
import { registerServiceWorker } from './client/core/service-worker/sw-registration';
import Routing from './client/core/routing/routing';
import { userApi } from './client/redux/userApi';
import { topicApi } from './client/redux/topicApi';

Sentry.init({
  dsn: 'https://291227dabf594d61b4b8435635794c05@o1321771.ingest.sentry.io/6578460',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const loggerMiddleware = createLogger();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(userApi.middleware)
      .concat(topicApi.middleware)
      .concat(loggerMiddleware),
  // @ts-ignore
  preloadedState: window.__PRELOADED_STATE__,
});

// Allow the passed state to be garbage-collected
// @ts-ignore
delete window.__PRELOADED_STATE__;

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <Sentry.ErrorBoundary showDialog fallback={<UnexpectedErrorPage />}>
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  </Sentry.ErrorBoundary>,
);

registerServiceWorker();
