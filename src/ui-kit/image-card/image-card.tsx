import React, { FC } from 'react';
import styles from './image-card.scss';

type Props = {
  caption: string;
};

export const ImageCard: FC<Props> = ({ caption = '' }) => <div className={styles['image-card']}>{caption}</div>;
