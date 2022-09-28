import React, { FC } from 'react';
import styles from './row.scss';
import { RowProps } from './types';

export const Row: FC<{ data: RowProps }> = ({ data }) => (
    <div className={styles.lb__row}>
      <div className={styles.lb__block}>
        <img className={styles.lb__avatar} src={data.avatar || 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg'} alt="Аватар" />
        <span className={styles.lb__login}>{data.login}</span>
      </div>
      <div className={styles.lb__score}>{data.score}</div>
    </div>
  );
