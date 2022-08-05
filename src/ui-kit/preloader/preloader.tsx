import React, { FC } from 'react';
import cn from 'classnames';
import styles from './preloader.scss';

export const Preloader: FC = () => (
    <div className={cn(styles.preloader)}>
      <div />
      <div />
    </div>
  );
