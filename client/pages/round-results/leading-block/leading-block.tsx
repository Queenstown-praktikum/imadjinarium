import React, { FC } from 'react';
import cn from 'classnames';
import styles from './leading-block.scss';

type LeadingBlockProps = {
  name: string;
  avatar: string;
  association: {
    displayType: 'wide' | 'narrow';
    text: string;
  };
};

export const LeadingBlock: FC<LeadingBlockProps> = ({ name, association, avatar }) => (
  <div className={styles['leading-block']}>
    <div className={styles['leading-block__header']}>
      <img src={avatar} className={styles['leading-block__avatar']} alt="Аватар" />
      <div className={cn(styles['leading-block__association'])}>{association.text}</div>
    </div>
    <div className={styles['leading-block__title']}>{name}</div>
  </div>
);
