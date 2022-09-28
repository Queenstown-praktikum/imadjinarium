import React from 'react';
import cn from 'classnames';
import styles from '../result-round.scss';

type ItemFinishProps = {
  name: string;
};

export const ItemFinish: React.FC<ItemFinishProps> = ({ name }) => (
    <div className={cn(styles['item-result'], styles['item-finish'])}>
      <div className={styles['item-result__header']}>
        <img className={styles['item-result__avatar']} src='https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg' alt='Аватар' />
        <p className={styles['item-result__name']}>{name}</p>
      </div>
    </div>
  );
