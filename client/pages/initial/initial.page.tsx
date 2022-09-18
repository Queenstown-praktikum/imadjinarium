import React, { FC } from 'react';
import { Button } from '../../ui-kit';
import styles from './initial.scss';
// import { PlayerCard } from './components/player-card';
import { Input } from '../../ui-kit/input/input';
import { useInitial } from './useInitial';

// временно, пока не добавим глобальный тип
// type User = { name: string; avatar: string };

// const users: User[] = [
//   { name: 'Дмитрий', avatar: 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg' },
//   { name: 'Влад', avatar: 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg' },
//   { name: 'Егор', avatar: 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg' },
// ];
//
// const renderPlayers = (players: User[]) =>
//   players.map(({ name, avatar }) => (
//     <li>
//       <PlayerCard tokenUrl={avatar} name={name} />
//     </li>
//   ));

export const InitialPage: FC = () => {
  const { countUser, onChange, handleClickStart } = useInitial();

  return (
    <div className={styles['initial-page']}>
      <h2 className={styles['initial-page__title']}>Новая игра</h2>
      <div className={styles['initial-page__block-content']}>
        <div className={styles['initial-page__label']}>Введите колличество ботов (1-5)</div>
        <Input value={countUser} onChange={onChange} />
        <div className={styles['initial-page__button']}>
          <Button onClick={handleClickStart} label='Старт' disabled={countUser === ''} />
        </div>
      </div>
    </div>
  );
};
