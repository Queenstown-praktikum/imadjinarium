import React, { FC } from 'react';
import cn from 'classnames';
import styles from './item-theme.scss';
import { ItemThemeProps } from '../../types';

export const ItemTheme: FC<ItemThemeProps> = ({ data, deleteItem }) => (
  <div className={cn(styles['item-theme__wrapper'])}>
    <div className={cn(styles['item-theme'])}>{data.title}</div>
    <div className={cn(styles['item-theme__delete'])} role='button' tabIndex={0} onClick={deleteItem(data.id)}>
      X
    </div>
  </div>
);
