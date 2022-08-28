import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { ImageCard } from 'ui-kit';
import styles from './player-selection.scss';
import { useHandOutCards } from '../../hooks/useHandOutCards';

export const PlayerSelectionPage: FC = () => {
  const { usersCards, user } = useHandOutCards();

  const cartList = useCallback(
    (id: number) => (
      <li className={styles['player-selection-page__card']}>
        <ImageCard imageUrl={`/image-cards/${id}.jpeg`} />
      </li>
    ),
    [],
  );

  return (
    <div className={cn(styles['player-selection-page'], 'fullscreen', 'centered')}>
      <h2 className={styles['player-selection-page__title']}>Игроки подобрали карты</h2>
      <ul className={styles['player-selection-page__cards']}>{usersCards?.[user?.id]?.map(cartList)}</ul>
    </div>
  );
};
