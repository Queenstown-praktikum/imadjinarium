import React, { FC } from 'react';
import styles from './player-token.scss';
import { convertImageUrlToCssUrl } from '../../utils/url';
import { PlayerTokenProps } from './types';

export const PlayerToken: FC<PlayerTokenProps> = ({ imageUrl }) => (
  <div className={styles['player-token']} style={{ backgroundImage: convertImageUrlToCssUrl(imageUrl) }} />
);