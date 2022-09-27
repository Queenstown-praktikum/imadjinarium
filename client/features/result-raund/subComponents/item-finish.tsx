import React from 'react';
import cn from 'classnames';
import styles from '../result-round.scss';

type ItemFinishProps = {
  name: string;
};

export const ItemFinish: React.FC<ItemFinishProps> = ({ name }) => (
    <div className={cn(styles['item-result'], styles['item-finish'])}>
      <div className={styles['item-result__header']}>
        <img className={styles['item-result__avatar']} src='' alt='Аватар' />
        <p className={styles['item-result__name']}>{name}</p>
      </div>
    </div>
  );
