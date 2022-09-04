import React, { FC } from 'react';
import cn from 'classnames';
import { Button, ImageCard } from 'ui-kit';
import styles from './round-results.scss';
import { LeadingBlock } from './leading-block/leading-block';
import { useRoundResult } from './useRoundResult';

const cartList = (id: number, name: string, votedId: number[]) => (
  <li key={id} className={styles['round-results__card']}>
    <ImageCard imageUrl={`/image-cards/${id}.jpeg`} caption={name} dataIdSelected={votedId} />
  </li>
);

export const RoundResultsPage: FC = () => {
  const { data, leadPlayer, associationText } = useRoundResult();
  console.log('!!!!!!!!!!', { data });
  return (
    <div className={cn(styles['round-results'], 'fullscreen', 'centered')}>
      <h2 className={styles['round-results__title']}>Результаты хода</h2>
      <div className={styles['round-results__leading-block']}>
        <LeadingBlock
          avatar={leadPlayer?.avatar ?? ''}
          name={leadPlayer?.name ?? ''}
          association={{ displayType: 'wide', text: associationText }}
        />
      </div>
      <ul className={styles['round-results__cards']}>
        {data.map((item) => cartList(item.idCard, item.name, item.votedId))}
      </ul>
      <div className={styles['round-results__button']}>
        <Button label='Подсчитать очки' />
      </div>
    </div>
  );
};
