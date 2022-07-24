import React, { FC } from 'react';
import styles from './row.scss';
import { RowProps } from './types';

export const Row: FC<{ data: RowProps }> = ({ data }) => (
    <div className={styles.lb_row}>
      <div className={styles.lb_block}>
        <img className={styles.lb_avatar} src={data.avatar} alt="Аватар" />
        <span className={styles.lb_login}>{data.login}</span>
      </div>
      <div className={styles.lb_score}>{data.score}</div>
    </div>
  );
