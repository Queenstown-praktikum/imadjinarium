import React, { FC } from 'react';
import styles from './leading-block.scss';

type LeadingBlockProps = {
  name: string;
  association: string;
};

export const LeadingBlock: FC<LeadingBlockProps> = ({ name, association }) => (
  <div className={styles['leading-block']}>
    <span className={styles['leading-block__title']}>{name} (ведущий)</span>
    <div className={styles['leading-block__association']}>{association}</div>
  </div>
);
