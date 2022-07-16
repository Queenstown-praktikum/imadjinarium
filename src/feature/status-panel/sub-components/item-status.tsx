import React, { FC } from 'react';
import cn from 'classnames';
import styles from '../status-panel.scss';
import { ItemStatusProps, StatusProps } from '../types';
import { Preloader } from '../../../components/preloader';
import { CheckedIcon } from '../../../icons';

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

export const ItemStatus: FC<{ data: ItemStatusProps }> = ({ data }) => (
    <div className={cn(styles['item-status'])}>
      <img src={data.avatar} alt='Аватар' className={cn(styles['item-status__avatar'])} />
      <div>
        <div className={cn(styles['item-status__name'])}>{data.name}</div>
        {data.leading ? <div className={cn(styles['item-status__role'])}>Ведущий</div> : null}
      </div>
      <div className={cn(styles['item-status__status'])}>{renderIcon(data.status)}</div>
    </div>
  );
