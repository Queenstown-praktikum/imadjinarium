import React, { FC } from 'react';
import styles from './landing.scss';

export const LandingPage: FC = () => (
  <main className={styles.landing}>
    
    <button className={styles['landing-play-button']} type='button'>
      Играть
    </button>
  </main>
);
