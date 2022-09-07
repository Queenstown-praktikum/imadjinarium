import React, { FC } from 'react';
import { Button } from 'ui-kit';
import styles from './initial.scss';
import { PlayerCard } from './components/player-card';

// временно, пока не добавим глобальный тип
type User = { name: string; avatar: string };

const users: User[] = [
  { name: 'Дмитрий', avatar: 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg' },
  { name: 'Влад', avatar: 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg' },
  { name: 'Егор', avatar: 'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg' },
];

const renderPlayers = (players: User[]) =>
  players.map(({ name, avatar }) => (
    <li>
      <PlayerCard tokenUrl={avatar} name={name} />
    </li>
  ));

export const InitialPage: FC = () => (
  <div className={styles['initial-page']}>
    <h2>Новая игра</h2>
    <ul className={styles['initial-page__players']} aria-label='list of players'>
      {renderPlayers(users)}
    </ul>
    <div className={styles['initial-page__button']}>
      <Button label='Играть' />
    </div>
  </div>
);
