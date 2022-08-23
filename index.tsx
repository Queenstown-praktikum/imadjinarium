import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
// import { BrowserTracing } from '@sentry/tracing';
import { Provider } from 'react-redux';
// import SentryRRWeb from '@sentry/rrweb';
import { store } from './src/redux/store';
// import { UnexpectedErrorPage } from './src/pages/unexpected-error/unexpected-error.page';
import { registerServiceWorker } from './src/core/service-worker/sw-registration';
import { BrowserRouter } from 'react-router-dom';
import Routing from './src/core/routing/routing';

// Sentry.init({
//   dsn: 'https://291227dabf594d61b4b8435635794c05@o1321771.ingest.sentry.io/6578460',
//   integrations: [new BrowserTracing(), new SentryRRWeb({})],
//
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

// const root = ReactDOM.createRoot(document.getElementById('root')!);
// root.render(
//   <Sentry.ErrorBoundary showDialog fallback={<UnexpectedErrorPage />}>
//     <Provider store={store}>
//       <div>asd</div>
//     </Provider>
//   </Sentry.ErrorBoundary>,
// );

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <Provider store={store}>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </Provider>,
);

registerServiceWorker();
