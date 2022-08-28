import '../../styles/index.scss';
import React, { FC, useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from 'ui-kit';
import { Navbar } from '../../ui-kit/navbar/navbar';
import styles from './layout.scss';
// import { useGetUserQuery } from '../../redux/userApi';
// import { setUserData } from '../../redux/slices/user';
import { useGetUserQuery } from '../../redux/userApi';
import { setUserData, userSelectors } from '../../redux/slices/user';
import { useAppDispatch } from '../../hooks/redux';

const DEFAULT_LINK = 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg';

export const Layout: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetUserQuery({});
  const user = useSelector(userSelectors.user);

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));
    }
  }, [data, dispatch]);

  const avatar = useMemo(() => user?.avatar || DEFAULT_LINK, [user]);

  return (
    <div className={styles.layout}>
      <Header avatarUrl={avatar} />
      <main>
        <Outlet />
      </main>
      <div className={styles.layout__block}>
        <Navbar
          links={[
            '/',
            'login',
            'rules',
            'game/initial',
            'game/player-selection',
            'game/round-intro-leading',
            'game/round-intro-player',
            'game/round-results',
            'game/forum',
            'game/leaderboard',
          ]}
        />
      </div>
    </div>
  );
};
