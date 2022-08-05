import React from 'react';
import { PlayerToken } from 'ui-kit';
import Logo from '../assets/logo.svg'
import styles from './header.scss'

interface HeaderProps {
  avatarUrl: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const {avatarUrl} = props

  return <header className={styles.header}>
    {avatarUrl ? <PlayerToken imageUrl={avatarUrl} /> : <div className={styles.header_emptyAva} />}
    <Logo className={styles.header_logo} />
    <div>Правила</div>
  </header>
}

export default Header
