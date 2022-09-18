import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { cardsSelectors, updateCards } from '../../redux/slices/cards';
import { useAppDispatch } from '../../hooks/redux';
import { userSelectors } from '../../redux/slices/user';
import { DataUserProps, setDataUser, setPlayers, updateLeaderUserId } from '../../redux/slices/game';

export const useInitial = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelectors.user);
  const cardsAll = [...useSelector(cardsSelectors.cardsAll)];
  const [countUser, setCountUser] = useState('2');

  const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCountUser(value);
  };

  const handleClickStart = () => {
    let count: number = Number(countUser);
    let data: DataUserProps = {};

    while (count--) {
      // Генерю ботов и раздаю им карты
      const hangOutCards = cardsAll?.splice(0, 6);
      data = {
        ...data,
        [count]: {
          id: count,
          name: `Bot_${count}`,
          avatar: '',
          cards: hangOutCards,
        },
      };
    }

    // раздаю карты USER
    const hangOutCards = cardsAll?.splice(0, 6);
    data = {
      ...data,
      [user.id]: {
        id: user.id,
        name: user.login,
        avatar: user.avatar,
        cards: hangOutCards,
      },
    };

    const dataUsersId = Object.values(data).map((item) => item.id);

    dispatch(setPlayers({ data: dataUsersId })); // сохраняю id всех игроков
    dispatch(updateCards({ data: cardsAll })); // обновляю колоду
    dispatch(setDataUser({ data })); // созраняю данные игроков
    dispatch(updateLeaderUserId({ id: user.id })); // устанавливаю ведущего

    navigate('/game/round-intro-leading');
  };

  return {
    countUser,
    setCountUser,
    onChange,
    handleClickStart,
  };
};
