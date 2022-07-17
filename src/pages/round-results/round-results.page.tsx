import React, { FC } from 'react';
import cn from 'classnames';
import styles from './round-results.scss';
import { ImageCard } from '../../ui-kit/image-card/image-card';

export const RoundResultsPage: FC = () => (
  <div className={cn(styles['round-results'], 'fullscreen', 'centered')}>
    <h2 className={styles['round-results__title']}>Результаты хода</h2>
    <ul className={styles['round-results__cards']}>
      <li className={cn(styles['round-results__card'], styles['round-results__card_primary'])}>
        <ImageCard
          imageUrl='https://papik.pro/uploads/posts/2021-09/1631229101_2-papik-pro-p-imadzhinarium-illyustratsii-2.jpg'
          caption='Карта ведущего'
          labelUrl='https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg'
        />
      </li>
      <li className={styles['round-results__card']}>
        <ImageCard
          imageUrl='https://papik.pro/uploads/posts/2021-09/1631229101_2-papik-pro-p-imadzhinarium-illyustratsii-2.jpg'
          caption='Дмитрий'
        />
      </li>
      <li className={styles['round-results__card']}>
        <ImageCard
          imageUrl='https://papik.pro/uploads/posts/2021-09/1631229101_2-papik-pro-p-imadzhinarium-illyustratsii-2.jpg'
          caption='Максим'
        />
      </li>
    </ul>
  </div>
);
