import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { PlayerToken } from '../index';
import Logo from '../assets/logo.svg';
import styles from './header.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useLogoutMutation } from '../../redux/userApi';
import { clearUserData } from '../../redux/slices/user';
import { useFullscreen } from '../../hooks/fullscreen';
import { useAudio } from '../../hooks/audio';

interface HeaderProps {
  avatarUrl: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const toggleFullscreen = useFullscreen();
  const { playing, toggleAudio } = useAudio();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const user = useAppSelector((s) => s.user);

  const goToProfile = useCallback(() => {
    navigate('/login/profile');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    if (!user.id) {
      navigate('/login');
    } else {
      logout({});
      dispatch(clearUserData());
    }
  }, [user, navigate, logout, dispatch]);

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
      <div className={styles.header_menu}>
        <Link to='rules' className={styles.header__link}>
          Правила
        </Link>
        <div className={styles.header__link} onClick={handleLogout}>
          {!user.id ? 'Вход' : 'Выход'}
        </div>
        <div onClick={toggleFullscreen}>FS</div>
        <div onClick={toggleAudio}>{playing ? 'Pause' : 'Play'}</div>
      </div>
    </header>
  );
};

export default Header;
