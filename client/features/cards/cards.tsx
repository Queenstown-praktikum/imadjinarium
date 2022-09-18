import React, { FC } from 'react';
import { ImageCard } from 'ui-kit';
import styles from './cards.scss';

type CardsProps = {
  data: number[];
  choiceCard: (value: number) => void;
};

const cartList = (id: number, choiceCard: (value: number) => void) => (
  /* eslint-disable-next-line */
  <li key={id} className={styles.card} onClick={() => choiceCard(id)}>
    <ImageCard imageUrl={`/image-cards/${id}.jpeg`} />
  </li>
);

export const Cards: FC<CardsProps> = ({ data, choiceCard }) => (
  <ul className={styles.cards}>{data.map((id) => cartList(id, choiceCard))}</ul>
);
