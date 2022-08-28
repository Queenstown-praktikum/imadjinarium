import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { PlayerToken } from 'ui-kit';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import styles from './header.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useLogoutMutation } from '../../redux/userApi';
import { clearUserData } from '../../redux/slices/user';

interface HeaderProps {
  avatarUrl: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const user = useAppSelector((s) => s.user);
  const goToProfile = useCallback(() => {
    navigate('/login');
  }, [navigate]);
  const handleLogout = () => {
    logout({});
    dispatch(clearUserData());
  };
  const { avatarUrl } = props;
  return (
    <header className={styles.header}>
      {avatarUrl ? (
        <PlayerToken imageUrl={avatarUrl} onClick={goToProfile} />
      ) : (
        <div className={styles.header_emptyAva} />
      )}
      <Link to='/'>
        <Logo className={styles.header_logo} />
      </Link>
      <Link to='rules' className={styles.header__link}>
        Правила
      </Link>
      {user.id && (
        <div className={styles.header__link} onClick={handleLogout}>
          logout
        </div>
      )}
    </header>
  );
};

export default Header;
