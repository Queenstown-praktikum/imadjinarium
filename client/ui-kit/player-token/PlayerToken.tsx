import React, { FC } from 'react';
import cn from 'classnames';
import styles from './player-token.scss';
import { convertImageUrlToCssUrl } from '../../utils/url';
import { PlayerTokenProps } from './types';

const PlayerToken: FC<PlayerTokenProps> = ({ imageUrl, onClick, className }) => (
  <div
    className={cn(styles['player-token'], className)}
    style={{ backgroundImage: convertImageUrlToCssUrl(imageUrl) }}
    onClick={onClick}
  />
);

export default PlayerToken
