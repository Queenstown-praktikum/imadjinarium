import React, { FC } from 'react';
import cn from 'classnames';
import styles from './404.scss';

export const Page404: FC = () => (
  <div className={cn(styles['page-404'], 'fullscreen', 'centered')}>
    <h1 className={styles['page-404__title']}>404</h1>
    <h3 className={styles['page-404__subtitle']}>Не туда попали :(</h3>
  </div>
);
