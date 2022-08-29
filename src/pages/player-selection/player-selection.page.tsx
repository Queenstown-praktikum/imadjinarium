import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { Button, ImageCard } from 'ui-kit';
import styles from './player-selection.scss';
import { useHandOutCards } from '../../hooks/useHandOutCards';
import { Input } from '../../ui-kit/input/input';

export const PlayerSelectionPage: FC = () => {
  const { usersCards, user, value, setValue } = useHandOutCards();

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
  return (
    <div className={cn(styles['player-selection-page'], 'fullscreen')}>
      <span className={styles['player-selection-page__title']}>Вы ведущий</span>
      <p className={styles['player-selection-page__desc']}>Выберете карту и загадайте на неё ассоциацию</p>
      <ul className={styles['player-selection-page__cards']}>{usersCards?.[user?.id]?.map(cartList)}</ul>
      <div className={styles['player-selection-page__input']}>
        <span className={styles['player-selection-page__label']}>Ассоциация</span>
        <div className={styles['player-selection-page__wrapper-input']}>
          <Input value={value} onChange={onChange} />
          <Button label="Готово" disabled={value === ''} />
        </div>
      </div>
    </div>
  );
};
