import '../../styles/index.scss';
import React, { FC, } from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../../ui-kit/navbar/navbar';

import styles from './layout.scss';
import { useGetUserQuery } from '../../redux/userApi';

export const Layout: FC = () => {
  const {
    isLoading,
  } = useGetUserQuery({})

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return <div className={styles.layout}>
    <header className={styles.layout__header}>
      <h1>Имаджинариум</h1>
      <Navbar links={['/', 'sign-in', 'sign-up', 'player-selection', 'round-results', 'forum', 'leaderboard']} />
    </header>
    <main>
      <Outlet />
    </main>
  </div>
}
