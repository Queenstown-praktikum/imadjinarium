import React, { FC } from 'react';
import cn from 'classnames';
import styles from '../status-panel.scss';
import { ItemStatusProps, LeaderUserId, StatusProps } from '../types';
import { Preloader } from '../../../ui-kit/preloader/preloader';
import { CheckedIcon } from '../../../../assets/icons';

const renderIcon = (stats: StatusProps) => {
  switch (stats) {
    case 'checked':
      return <CheckedIcon />;
    case 'pending':
      return <Preloader />;
    default:
      return null;
  }
};

export const ItemStatus: FC<{ data: ItemStatusProps | LeaderUserId }> = ({ data }) => (
  <div className={cn(styles['item-status'])}>
    <img src={data.avatar || 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg'} alt='Аватар' className={cn(styles['item-status__avatar'])} />
    <div>
      <div className={cn(styles['item-status__name'])}>{data.name}</div>
      {data.leading && <div className={cn(styles['item-status__role'])}>Ведущий</div>}
    </div>
    <div className={cn(styles['item-status__status'])}>{renderIcon(data.status)}</div>
  </div>
);
