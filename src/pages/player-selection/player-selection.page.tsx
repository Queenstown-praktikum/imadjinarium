import React, { FC, useCallback, useState } from 'react';
import cn from 'classnames';
import { Button, ImageCard } from 'ui-kit';
import styles from './player-selection.scss';
import { useHandOutCards } from '../../hooks/useHandOutCards';
import { Input } from '../../ui-kit/input/input';
import { Modal } from '../../ui-kit/modal/modal';
import { StatusPanel } from '../../features/status-panel/status-panel';

export const PlayerSelectionPage: FC = () => {
  const { usersCards, user, value, setValue } = useHandOutCards();
  const [showModal, setShowModal] = useState<boolean>(false);

  const cartList = useCallback(
    (id: number) => (
      <li className={styles['player-selection-page__card']}>
        <ImageCard imageUrl={`/image-cards/${id}.jpeg`} />
      </li>
    ),
    [],
  );
  const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleClickButton = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className={cn(styles['player-selection-page'], 'fullscreen')}>
        <span className={styles['player-selection-page__title']}>Вы ведущий</span>
        <p className={styles['player-selection-page__desc']}>Выберете карту и загадайте на неё ассоциацию</p>
        <ul className={styles['player-selection-page__cards']}>{usersCards?.[user?.id]?.map(cartList)}</ul>
        <div className={styles['player-selection-page__input']}>
          <span className={styles['player-selection-page__label']}>Ассоциация</span>
          <div className={styles['player-selection-page__wrapper-input']}>
            <Input value={value} onChange={onChange} />
            <Button label='Готово' disabled={value === ''} onClick={handleClickButton} />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal>
          <StatusPanel title="Ждем остальных игроков" />
        </Modal>
      )}
    </>
  );
};
