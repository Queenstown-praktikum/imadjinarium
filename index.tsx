import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { Provider } from 'react-redux';
import SentryRRWeb from '@sentry/rrweb';
import { reducer } from './src/redux/store';
import { UnexpectedErrorPage } from './src/pages/unexpected-error/unexpected-error.page';
import { registerServiceWorker } from './src/core/service-worker/sw-registration';
import { BrowserRouter } from 'react-router-dom';
import Routing from './src/core/routing/routing';
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './src/redux/userApi';
import { createLogger } from 'redux-logger';

Sentry.init({
  dsn: 'https://291227dabf594d61b4b8435635794c05@o1321771.ingest.sentry.io/6578460',
  integrations: [new BrowserTracing(), new SentryRRWeb({})],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
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
