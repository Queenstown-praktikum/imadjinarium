import '../../styles/index.scss';
import React, { FC, useMemo, } from 'react';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { Header } from 'ui-kit';
import { Navbar } from '../../ui-kit/navbar/navbar';
import styles from './layout.scss';
// import { useGetUserQuery } from '../../redux/userApi';
// import { setUserData } from '../../redux/slices/user';
import { ApplicationState } from '../../redux/store';

const DEFAULT_LINK = 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg'

export const Layout: FC = () => {
  // const dispatch = useDispatch()
  // const { data } = useGetUserQuery({})
  const user = useSelector((state: ApplicationState) => state.user)

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setUserData(data))
  //   }
  // }, [data, dispatch])

  const avatar = useMemo(() => user?.avatar || DEFAULT_LINK, [user])

  return (
    <div className={styles.layout}>
      <Header avatarUrl={avatar} />
      <Navbar
        links={[
          '/',
          'login',
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
