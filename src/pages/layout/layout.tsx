import '../../styles/index.scss';
import React, { FC, useEffect, } from 'react';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { Header } from 'ui-kit';
import { Navbar } from '../../ui-kit/navbar/navbar';
import styles from './layout.scss';
import { useGetUserQuery } from '../../redux/userApi';
import { setUserData } from '../../redux/slices/user';

export const Layout: FC = () => {
  const dispatch = useDispatch()
  const {
    data,
  } = useGetUserQuery({})

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data))
    }
  }, [data, dispatch])

  return (
    <div className={styles.layout}>
      <Header avatarUrl='https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg' />
      <Navbar
        links={[
          '/',
          'sign-in',
          'sign-up',
          'initial',
          'player-selection',
          'round-intro-leading',
          'round-intro-player',
          'round-results',
          'forum',
          'leaderboard',
          'rules'
        ]}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
