import React, { FC } from 'react';
import cn from 'classnames';
import styles from './player-token.scss';
import { convertImageUrlToCssUrl } from '../../utils/url';
import { PlayerTokenProps } from './types';

const PlayerToken: FC<PlayerTokenProps> = ({ imageUrl, onClick, className }) => (
  <div
    className={cn(styles['player-token'], className)}
    style={{
      backgroundImage: convertImageUrlToCssUrl(
        imageUrl || 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg',
      ),
    }}
    onClick={onClick}
  />
);

export default PlayerToken;
