import '../../styles/index.scss';
import React, { FC, useEffect, } from 'react';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { Navbar } from '../../ui-kit/navbar/navbar';
import styles from './layout.scss';
import { useGetUserQuery } from '../../redux/userApi';
import { setUserData } from '../../redux/slices/user';

export const Layout: FC = () => {
  const dispatch = useDispatch()
  const {
    data,
    isLoading,
  } = useGetUserQuery({})

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data))
    }
  }, [data, dispatch])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return <div className={styles.layout}>
    <header className={styles.layout__header}>
      <h1>Имаджинариум</h1>
      <Navbar links={['/', 'sign-in', 'sign-up', 'player-selection', 'forum', 'leaderboard']} />
    </header>
    <main>
      <Outlet />
    </main>
  </div>
}
