import React, { FC } from 'react';
import { Button } from 'ui-kit';
import { useNavigate } from 'react-router-dom';
import styles from './landing.scss';

export const LandingPage: FC = () => {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate('/game/round-intro-leading');
  };
  return (
    <main className={styles.landing}>
      <p className={styles.landing__desc}>
        <span>Имаджинариум</span> – это настольная игра в ассоциации, всем игрокам будет выдано по 6 карточек с… как бы
        помягче сказать… непонятно с чем. Что именно изображено на картинках вам, скорее всего, не ответят даже
        иллюстраторы, создавшие их. Робот-водолаз с парашютом за спиной. Дед Мазай, зайцы и морковь, с поправкой на то,
        что Дед Мазай – тоже заяц. Палец Тома Уэйтса, играющий на дымящейся флейте. Это как раз тот случай, когда от
        неудержимости фантазии авторов игра становилась лишь лучше.
      </p>
      <p className={styles.landing__desc}>
        Каждый из игроков по очереди становится ведущим. В свой ход ведущий выбирает из своей руки наиболее
        понравившуюся карточку, кладёт её на стол рубашкой вверх и загадывает ассоциацию. Все остальные игроки пытаются
        найти среди своих карточек ту, которая будет максимально подходить под загаданное ведущим.
      </p>
      <p className={styles.landing__desc}>
        Секрет в том, что ведущему нужно дать такую ассоциацию, чтобы она была очевидной, но не слишком. Очки он получит
        только в том случае, если его карточку угадают, но не все.
      </p>
      <div className={styles.landing__wrapper_button}>
        <Button label='Играть' onClick={handleClickButton} />
      </div>
    </main>
  );
};