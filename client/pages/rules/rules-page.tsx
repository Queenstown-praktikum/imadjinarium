import React, { FC } from 'react';
import cn from 'classnames';
import { Button } from 'ui-kit';
import { useNavigate } from 'react-router-dom';
import styles from './rules.scss';

export const Rules: FC = () => {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate('/game/initial');
  };
  return (
    <main className={styles.rules}>
      <article className={styles.rules__content}>
        <div className={styles.rules__left}>
          <section className={styles['rules-info__item']}>
            <h3 className={styles.rules__title}>Цель игры</h3>
            <p className={cn(styles['rules-info'])}>
              Опередить соперников и набрать наибольшее количество очков, получить удовольствие и узнать лучше своих
              друзей.
            </p>
          </section>
          <section className={styles['rules-info__item']}>
            <h3 className={styles.rules__title}>Ход игры</h3>
            <p className={styles['rules-info']}>
              Ведущий рассматривает карточки. Из них он выбирает ту, которая вызвала у него самую интересную ассоциацию
              (сложную, но желательно понятную хотя бы одному игроку). Озвучивает ассоциацию другим игрокам.
            </p>
            <p className={styles['rules-info']}>
              После своего перформанса ведущий кладёт закрытую карту в центр. Участники находят среди своих картинок ту,
              которая ярче других иллюстрирует озвученную ассоциацию, и отправляют ее на стол. Когда все сделали свой
              выбор, ведущий перетасовывает карточки, после этого выкладывает лицом вверх. [Todo: edit]
            </p>
            <p className={styles['rules-info']}>
              Участники внимательно разглядывают все картинки, стараясь высмотреть ту, которую выложил ведущий.
              Происходит тайное голосование. Все игроки (кроме ведущего) выбирают жетон с цифрой, но не показывают его
              остальным. По команде таблички переворачивают. Происходит подсчёт очков. [Todo: edit]
            </p>
          </section>
        </div>
        <div className={styles.rules__right}>
          <section className={styles['rules-info__item']}>
            <h3 className={styles.rules__title}>Определение количества баллов</h3>

            <h4>Перемещение игроков</h4>
            <p className={styles['rules-info']}>Если игрок угадал карту ведущего, то он получает +3 очка</p>
            <p className={styles['rules-info']}>
              Если кто-то из соперников отметил карту любого участника, то последний получает соответствующее количество
              очков, вне зависимости от того, обнаружил ли он картинку ведущего. [Todo: edit]
            </p>

            <h4>Перемещение ведущего</h4>
            <p className={styles['rules-info']}>
              Если карту ведущего угадали все игроки, или, наоборот, никто – ведущий не получает очков. Остальные
              получают по 1 очку если их карту угадали. В остальных случаях каждый угадавший карту ведущего игрок
              получает 3 очка, ведущий получает 3 очка и по одному очку за каждого играка угадавщего его карту.
            </p>
          </section>
        </div>
      </article>
      <div className={styles['rules-wrapper-button']}>
        <Button label='Играть' onClick={handleClickButton} />
      </div>
    </main>
  );
};
