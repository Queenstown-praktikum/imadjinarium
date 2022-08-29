import React, { FC } from 'react';
import cn from 'classnames';
import styles from './status-panel.scss';
import { ItemStatus } from './sub-components/item-status';
import { mockData } from './mock';

export const StatusPanel: FC = () => (
    <div className={cn(styles.sp)}>
      <h3 className={cn(styles.sp__title)}>Статусы игроков</h3>
      <div className={cn(styles.sp__body)}>
        {Object.entries(mockData).map(([key, item]) => (
            <div className={cn(styles.sp__item)}>
              <ItemStatus key={key} data={item} />
            </div>
          ))}
      </div>
    </div>
  );
