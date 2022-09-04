import React, { FC } from 'react';
import { ImageCard } from 'ui-kit';
import styles from './cards.scss';
import { UserDataProps } from '../../redux/slices/cards';
import { IUser } from '../../redux/slices/user';

type CardsProps = {
  data: UserDataProps;
  user: IUser;
  choiceCard: (value: number) => void;
};

const cartList = (id: number, choiceCard: (value: number) => void) => (
  /* eslint-disable-next-line */
  <li key={id} className={styles.card} onClick={() => choiceCard(id)}>
    <ImageCard imageUrl={`/image-cards/${id}.jpeg`} />
  </li>
);

export const Cards: FC<CardsProps> = ({ data, user, choiceCard }) => (
  <ul className={styles.cards}>{data?.[user?.id]?.map((id) => cartList(id, choiceCard))}</ul>
);
