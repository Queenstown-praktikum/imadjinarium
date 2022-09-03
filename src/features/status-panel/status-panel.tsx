import React, { FC } from 'react';
import cn from 'classnames';
import { Button } from 'ui-kit';
import styles from './status-panel.scss';
import { ItemStatus } from './sub-components/item-status';
import { mockData } from './mock';

type StatusPanelProps = {
  title: string;
  button?: boolean;
};

export const StatusPanel: FC<StatusPanelProps> = ({ title, button }) => (
  <div className={cn(styles.sp)}>
    <div className={styles.sp__header}>
      <h3 className={cn(styles.sp__title)}>{title}</h3>
      {button && <Button label="Начать" />}
    </div>
    <div className={cn(styles.sp__body)}>
      {Object.entries(mockData).map(([key, item]) => (
        <div>
          <ItemStatus key={key} data={item} />
        </div>
      ))}
    </div>
  </div>
);
