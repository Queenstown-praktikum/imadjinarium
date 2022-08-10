import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Layout } from '../../pages/layout/layout';
import { LandingPage } from '../../pages/landing/landing.page';
import { InitialPage } from '../../pages/initial/initial.page';
import { Forum } from '../../pages/forum/forum';
import { LeaderBoard } from '../../pages/leader-board/leader-board';
import { PlayerSelectionPage } from '../../pages/player-selection/player-selection.page';
import { RoundIntroPage } from '../../pages/round-intro/round-intro.page';
import { RoundResultsPage } from '../../pages/round-results/round-results.page';
import { Page404 } from '../../pages/404/404.page';
import { Rules } from '../../pages/rules/rules-page';
import { LoginPage } from '../../pages/login/login-page';

export const Routing = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path='login/*' element={<LoginPage />} />
        <Route path='initial' element={<InitialPage />} />
        <Route path='forum' element={<Forum />} />
        <Route path='leaderboard' element={<LeaderBoard />} />
        <Route path='player-selection' element={<PlayerSelectionPage />} />
        <Route path='rules' element={<Rules />} />
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
);
