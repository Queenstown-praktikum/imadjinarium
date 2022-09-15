import React, { FC } from 'react';
import styles from '../result-round.scss';

type ItemResultProps = {
  name: string;
  count: number;
};

export const ItemResult: FC<ItemResultProps> = ({ name, count }) => (
  <div className={styles['item-result']}>
    <div className={styles['item-result__header']}>
      <img className={styles['item-result__avatar']} src='' alt='Аватар' />
      <p className={styles['item-result__name']}>
        {name} <span>{`+ ${count}`}</span>
      </p>
    </div>
    {/* <div className={styles['item-result__progress-bar']} style={cn({--count: count})} /> */}
  </div>
);
