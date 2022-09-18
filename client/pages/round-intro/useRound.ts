import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RoleProps } from './types';
import {
  gameSelectors,
  ItemDataUserProps,
  setSelectedCardUser,
  setVotedCardUser,
  updateAssociationText,
} from '../../redux/slices/game';
import { userSelectors } from '../../redux/slices/user';
import { useAppDispatch } from '../../hooks/redux';

export const useRound = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(userSelectors.user);
  const dataUser = useSelector(gameSelectors.dataUser);
  const leaderUserId = useSelector(gameSelectors.leaderUserId);

  const [activeUser, setActiveUser] = useState<ItemDataUserProps>();
  const [role, setRole] = useState<RoleProps>('player');
  const [association, setAssociation] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // useEffect(() => {
  //   if (selectedCard && !Object.values(selectedCard).includes(null)) setShowModal(false);
  // }, [selectedCard]);

  useEffect(() => {
    if (leaderUserId !== null && Object.values(dataUser).length) {
      const userActive = dataUser[leaderUserId];
      setActiveUser(userActive);
      if (leaderUserId === user.id) setRole('leading');
    }
  }, [dataUser, leaderUserId, user]);

  const handleClickButtonCard = (id: number) => {
    setSelectedCard(id);
  };

  const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setAssociation(e.target.value);
  };

  const handleClickButton = () => {
    if (!selectedCard) return;
    // сетаю ассоциацию
    dispatch(updateAssociationText({ text: association }));
    dispatch(setSelectedCardUser({ idUser: user.id, idCard: selectedCard }));
    dispatch(setVotedCardUser({ idUser: user.id, idCard: -1 }));
    setShowModal(true);

    // setTimeout(() => {
    // тут рандом выбора ботами карт на ассоциацию
    Object.entries(dataUser).forEach(([key, item], idx) => {
      const keyUser = Number(key);
      if (leaderUserId && keyUser !== leaderUserId) {
        setTimeout(() => {
          dispatch(setSelectedCardUser({ idUser: keyUser, idCard: item.cards[0] }));
        }, 1000 * (idx + 1));
      }
    });
  };

  return {
    role,
    activeUser,
    handleClickButtonCard,
    association,
    onChange,
    handleClickButton,
    selectedCard,
    showModal,
  };
};
