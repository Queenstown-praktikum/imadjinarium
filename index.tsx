import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import SentryRRWeb from '@sentry/rrweb';
import { LandingPage } from './src/pages/landing/landing.page';
import { Page404 } from './src/pages/404/404.page';
import { Layout } from './src/pages/layout/layout';
import { SignInPage } from './src/pages/sign-in/sign-in.page';
import { SignUpPage } from './src/pages/sign-up/sign-up.page';
import { store } from './src/redux/store';
import { UnexpectedErrorPage } from './src/pages/unexpected-error/unexpected-error.page';
import { PlayerSelectionPage } from './src/pages/player-selection/player-selection.page';
import { RoundResultsPage } from './src/pages/round-results/round-results.page';
import { RoundIntroPage } from './src/pages/round-intro/round-intro.page';
import { Forum } from './src/pages/forum/forum';
import { LeaderBoard } from './src/pages/leader-board/leader-board';
import { InitialPage } from './src/pages/initial/initial.page';
import { registerServiceWorker } from './src/core/service-worker/sw-registration';

Sentry.init({
  dsn: 'https://291227dabf594d61b4b8435635794c05@o1321771.ingest.sentry.io/6578460',
  integrations: [new BrowserTracing(), new SentryRRWeb({})],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Sentry.ErrorBoundary showDialog fallback={<UnexpectedErrorPage />}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path='sign-in' element={<SignInPage />} />
            <Route path='sign-up' element={<SignUpPage />} />
            <Route path='initial' element={<InitialPage />} />
            <Route path='forum' element={<Forum />} />
            <Route path='leaderboard' element={<LeaderBoard />} />
            <Route path='player-selection' element={<PlayerSelectionPage />} />
            <Route
              path='round-intro-leading'
              element={<RoundIntroPage rounds={{ current: 1, all: 3 }} userRole='leading' />}
            />
            <Route
              path='round-intro-player'
              element={<RoundIntroPage rounds={{ current: 2, all: 3 }} userRole='player' />}
            />
            <Route path='round-results' element={<RoundResultsPage />} />
            <Route path='*' element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </Sentry.ErrorBoundary>,
);

registerServiceWorker();
