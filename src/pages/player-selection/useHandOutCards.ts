import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPlayer, playersSelectors, PlayerType, updatePlayer } from '../../redux/slices/players';
import { cardsSelectors, setUserCards } from '../../redux/slices/cards';
import { userSelectors } from '../../redux/slices/user';
import { gameSelectors, updateAssociationText, updateLeaderUserId } from '../../redux/slices/game';

const mockPlayer1: PlayerType = {
  id: 1,
  name: 'Den',
  avatar: '',
  cards: [],
  score: 0,
  status: 'pending',
  selectedCardId: null,
  votedCardId: null,
};

const mockPlayer2: PlayerType = {
  id: 2,
  name: 'Den2',
  avatar: '',
  cards: [],
  score: 0,
  status: 'pending',
  selectedCardId: null,
  votedCardId: null,
};

export type DataProps = {
  value: string;
  id: number | null;
};

const initialData: DataProps = {
  value: '',
  id: null,
};

export const useHandOutCards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState<DataProps>(initialData);
  const user = useSelector(userSelectors.user);
  const players = useSelector(playersSelectors.players);
  const usersCards = useSelector(cardsSelectors.cardsUser);
  const cardsAll = [...useSelector(cardsSelectors.cardsAll)];
  const associationText = useSelector(gameSelectors.associationText);

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(addPlayer(mockPlayer1));
    dispatch(addPlayer(mockPlayer2));
    dispatch(
      addPlayer({
        id: user.id,
        name: user.login ?? '',
        avatar: user.avatar ?? '',
        cards: [],
        score: 0,
        status: 'pending',
        selectedCardId: null,
        votedCardId: null,
      }),
    );
    dispatch(updateLeaderUserId({ id: user.id }));
  }, []);

  useEffect(() => {
    // Раздаем карты
    if (!Object.values(players).length) return;
    Object.values(players).forEach(({ id }) => {
      const hangOutCards = cardsAll?.splice(0, 6);
      dispatch(setUserCards({ id, data: hangOutCards }));
    });
  }, [players]);

  useEffect(() => {
    // Проверям все ли выбрали карту
    if (!Object.values(players).length) return;

    const mass = Object.values(players).map((item) => item.selectedCardId);
    if (!mass.includes(null)) {
      navigate('/game/round-results');
    }
  }, [players]);

  const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setData({ ...data, value: e.target.value });
  };
  const handleClickButton = () => {
    // Показываю модалку и сохраняю ассоциацию
    setShowModal(true);
    dispatch(updateAssociationText({ text: data.value }));
    // Сохраняю выбранную карту
    dispatch(updatePlayer({ ...players[user.id], selectedCardId: data.id }));
  };
  const handleClickButtonCard = (id: number) => {
    // Сетаю выбранную карту
    setData({ ...data, id });
  };

  /**
   *  ----- Эмуляция действий ------
   */

  const DELAY = 1500;

  React.useEffect(() => {
    if (!associationText) return;
    // 1 Игрок
    setTimeout(() => {
      dispatch(updatePlayer({ ...players[1], selectedCardId: 1, votedCardId: 1 }));
    }, DELAY);
    // 2 Игрок
    setTimeout(() => {
      dispatch(updatePlayer({ ...players[2], selectedCardId: 8, votedCardId: 1 }));
    }, DELAY * 2);
  }, [associationText]);

  return { usersCards, user, data, onChange, showModal, handleClickButton, handleClickButtonCard };
};
