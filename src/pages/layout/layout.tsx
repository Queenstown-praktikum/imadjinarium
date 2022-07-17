import '../../styles/index.scss';
import React, { FC, useEffect } from 'react';
import { Outlet , useNavigate } from 'react-router';
import { Navbar } from '../../components/navbar/navbar';

import styles from './layout.scss';
import { useGetUserQuery } from '../../redux/userApi';

export const Layout: FC = () => {
  const { isError, isLoading } = useGetUserQuery({})
  const navigate = useNavigate();

  useEffect(() => {
    if(isError) {
      navigate('/sign-in')
    }
  }, [isError, navigate])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return <div className={styles.layout}>
    <header className={styles.layout__header}>
      <h1>Имаджинариум</h1>
      <Navbar links={['/', 'sign-in', 'sign-up', 'forum', 'leaderboard']} />
    </header>
    <main className={styles.layout__content}>
      <Outlet />
    </main>
  </div>
}
