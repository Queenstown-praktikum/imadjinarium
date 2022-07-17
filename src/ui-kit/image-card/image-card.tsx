import React, { FC } from 'react';
import styles from './image-card.scss';
import { convertImageUrlToCssUrl } from '../../utils/url';

type Props = {
  imageUrl: string;
  labelUrl?: string;
  caption?: string;
};

export const ImageCard: FC<Props> = ({ imageUrl, labelUrl, caption }) => (
  <div className={styles['image-card']} style={{ backgroundImage: convertImageUrlToCssUrl(imageUrl) }}>
    {labelUrl && (
      <div className={styles['image-card__label']} style={{ backgroundImage: convertImageUrlToCssUrl(labelUrl) }} />
    )}
    {caption && <div className={styles['image-card__caption']}>{caption}</div>}
  </div>
);
