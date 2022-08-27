import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { PlayerToken } from 'ui-kit';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import styles from './header.scss';

interface HeaderProps {
  avatarUrl: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const navigate = useNavigate();
  const goToProfile = useCallback(() => {
    navigate('/login');
  }, [navigate]);

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
    </header>
  );
};

export default Header;
