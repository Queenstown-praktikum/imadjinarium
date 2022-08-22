import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { PlayerToken } from 'ui-kit';
import Logo from '../assets/logo.svg'
import styles from './header.scss'

interface HeaderProps {
  avatarUrl: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const navigate = useNavigate();
  const goToProfile = useCallback(() => {
    navigate('/login')
  }, [navigate])

  const { avatarUrl } = props
  return <header className={styles.header}>
    {avatarUrl ? <PlayerToken
      imageUrl={avatarUrl}
      onClick={goToProfile}
    /> : <div className={styles.header_emptyAva} />}
    <Logo className={styles.header_logo} />
    <div>Правила</div>
  </header>
}

export default Header
