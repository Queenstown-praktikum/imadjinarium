import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.scss';

type Props = {
  links: string[];
};

export const Navbar: FC<Props> = ({ links }) => (
  <nav className={styles.navbar}>
    <ul className={styles.navbar__links}>
      {links.map((link) => (
        <li key={link}>
          <Link to={link}>{link}</Link>
        </li>
      ))}
    </ul>
  </nav>
);
