import React, { FC, useState } from 'react';
import cn from 'classnames';
import { Button, ImageCard } from 'ui-kit';
import styles from './round-results.scss';
import { LeadingBlock } from './leading-block/leading-block';
import { useRoundResult } from './useRoundResult';
import { Modal } from '../../ui-kit/modal/modal';
import { ResultRound } from '../../features/result-raund/result-round';
import { setDataResultPage } from '../../redux/slices/game';
import { useAppDispatch } from '../../hooks/redux';

const cartList = (id: number, name: string, votedId: number[]) => (
  <li key={id} className={styles['round-results__card']}>
    <ImageCard imageUrl={`/image-cards/${id}.jpg`} caption={name} dataIdSelected={votedId} />
  </li>
);

export const RoundResultsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { data, leadPlayer, associationText } = useRoundResult();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = () => {
    if (!data.length) return;
    dispatch(setDataResultPage({ data }));
    setShowModal(true);
  };

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
        <Button label='Подсчитать очки' onClick={handleClick} />
      </div>
      {showModal && (
        <Modal>
          <ResultRound />
        </Modal>
      )}
    </div>
  );
};
