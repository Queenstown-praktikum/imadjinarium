import '../../styles/index.scss';
import React, { FC } from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../../ui-kit/navbar/navbar';

import styles from './layout.scss';

export const Layout: FC = () => (
  <div className={styles.layout}>
    <header className={styles.layout__header}>
      <h1>Имаджинариум</h1>
      <Navbar links={['/', 'sign-in', 'sign-up', 'forum', 'leaderboard']} />
    </header>
    <main className={styles.layout__content}>
      <Outlet />
    </main>
  </div>
);
