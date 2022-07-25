import React, { FC } from 'react';
import styles from './image-card.scss';
import { convertImageUrlToCssUrl } from '../../utils/url';
import { PlayerToken } from '../player-token/player-token';

type Props = {
  imageUrl: string;
  labelUrl?: string;
  caption?: string;
};

export const ImageCard: FC<Props> = ({ imageUrl, labelUrl, caption }) => (
  <div className={styles['image-card']} style={{ backgroundImage: convertImageUrlToCssUrl(imageUrl) }}>
    {labelUrl && (
      <div className={styles['image-card__label']}>
        <PlayerToken imageUrl={labelUrl} />
      </div>
    )}
    {caption && <div className={styles['image-card__caption']}>{caption}</div>}
  </div>
);
