import React, { FC } from 'react';
import cn from 'classnames';
import { ImageCard } from 'ui-kit';
import styles from './player-selection.scss';

export const PlayerSelectionPage: FC = () => (
  <div className={cn(styles['player-selection-page'], 'fullscreen', 'centered')}>
    <h2 className={styles['player-selection-page__title']}>Игроки подобрали карты</h2>
    <ul className={styles['player-selection-page__cards']}>
      <li className={styles['player-selection-page__card']}>
        <ImageCard imageUrl='https://papik.pro/uploads/posts/2021-09/1631229101_2-papik-pro-p-imadzhinarium-illyustratsii-2.jpg' />
      </li>
      <li className={styles['player-selection-page__card']}>
        <ImageCard
          imageUrl='https://papik.pro/uploads/posts/2021-09/1631229101_2-papik-pro-p-imadzhinarium-illyustratsii-2.jpg'
          caption='Ваша карта'
        />
      </li>
      <li className={styles['player-selection-page__card']}>
        <ImageCard imageUrl='https://papik.pro/uploads/posts/2021-09/1631229101_2-papik-pro-p-imadzhinarium-illyustratsii-2.jpg' />
      </li>
    </ul>
  </div>
);
