import React, { FC } from 'react';
import { PlayerToken } from 'ui-kit';
import styles from './player-card.scss';
import { PlayerCardProps } from './types';

export const PlayerCard: FC<PlayerCardProps> = ({ tokenUrl, name }) => (
  <>
    <PlayerToken imageUrl={tokenUrl} />
    <span className={styles['player-name']}>{name}</span>
  </>
);
