import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from './src/pages/landing/landing.page';
import { Page404 } from './src/pages/404/404.page';
import { Layout } from './src/pages/layout/layout';
import { SignInPage } from './src/pages/sign-in/sign-in.page';
import { SignUpPage } from './src/pages/sign-up/sign-up.page';
import { UnexpectedErrorPage } from './src/pages/unexpected-error/unexpected-error';

Sentry.init({
  dsn: 'https://291227dabf594d61b4b8435635794c05@o1321771.ingest.sentry.io/6578460',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Sentry.ErrorBoundary fallback={<UnexpectedErrorPage />}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path='sign-in' element={<SignInPage />} />
          <Route path='sign-up' element={<SignUpPage />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Sentry.ErrorBoundary>,
);
