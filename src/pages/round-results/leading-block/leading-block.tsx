import React, { FC } from 'react';
import cn from 'classnames';
import styles from './leading-block.scss';

type LeadingBlockProps = {
  name: string;
  association: {
    displayType: 'wide' | 'narrow';
    text: string;
  };
};

export const LeadingBlock: FC<LeadingBlockProps> = ({ name, association }) => (
  <div className={styles['leading-block']}>
    <span className={styles['leading-block__title']}>{name} (ведущий)</span>
    <div
      className={cn(styles['leading-block__association'], {
        [styles['leading-block__association_wide']]: association.displayType === 'wide',
        [styles['leading-block__association_narrow']]: association.displayType === 'narrow',
      })}
    >
      {association.text}
    </div>
  </div>
);
