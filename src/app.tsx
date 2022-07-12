import './styles/index.scss';
import React, { FC } from 'react';
import { LandingPage } from './pages/landing/landing.page';
import { Page404 } from './pages/404/404.page';

export const App: FC = () => (
  <>
    <LandingPage />
    <Page404 />
  </>
);
