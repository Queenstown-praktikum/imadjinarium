import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
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
import { userSelectors } from '../../redux/slices/user';

const ProtectedRouter = ({ isLogin, children }: { isLogin: boolean; children: any }) => {
  const navigate = useNavigate();
  if (!isLogin) {
    return navigate('/');
  }
  return children;
};

export const Routing = () => {
  const user = useSelector(userSelectors.user);
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<LandingPage />} />
        <Route path='rules' element={<Rules />} />
        <Route path='login/*' element={<LoginPage />} />
        <Route
          path='game/*'
          element={
            <ProtectedRouter isLogin={Boolean(user.id)}>
              <Routes>
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
              </Routes>
            </ProtectedRouter>
          }
        />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default Routing;
