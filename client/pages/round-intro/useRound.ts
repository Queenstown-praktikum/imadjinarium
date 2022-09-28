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
import { randomItem } from '../../utils/shuffle';

const dataBotAssociation = ['Усталость', 'Работа', 'Отдых', 'Развлечение', 'Лето', 'Зима', 'Осень', 'Лето'];

export const useRound = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(userSelectors.user);
  const dataUser = useSelector(gameSelectors.dataUser);
  const leaderUserId = useSelector(gameSelectors.leaderUserId);
  const selectCards = useSelector(gameSelectors.selectedCards);

  const round = useSelector(gameSelectors.round);
  const [activeUser, setActiveUser] = useState<ItemDataUserProps>();
  const [role, setRole] = useState<RoleProps>('player');
  const [association, setAssociation] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalChoice, setShowModalChoice] = useState<boolean>();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [mode, setMode] = useState<'vote'>();

  useEffect(() => {
    // тут сбрасываем выбор карты и показываем выбранные карты
    if (round > 1) {
      setSelectedCard(null);
      const dataCards = Object.values(selectCards);
      if (dataCards.length === Object.values(dataUser).length) {
        setMode('vote');
        setSelectedCards(dataCards);
      }
    }
  }, [selectCards]);

  useEffect(() => {
    if (round > 1 && mode !== 'vote') {
      setShowModalChoice(true);
      // бот выбирает карту
      Object.entries(dataUser).forEach(([key, item]) => {
        const keyUser = Number(key);
        if (leaderUserId !== null && keyUser === leaderUserId) {
          setTimeout(() => {
            setShowModalChoice(false);
            dispatch(setSelectedCardUser({ idUser: keyUser, idCard: item.cards[0] }));
          }, 5000);
        }
      });
      const assoc = randomItem(dataBotAssociation);
      setAssociation(assoc);
      dispatch(updateAssociationText({ text: assoc }));
    }
  }, [round, dataUser, leaderUserId]);

  useEffect(() => {
    if (leaderUserId !== null && Object.values(dataUser).length) {
      const userActive = dataUser[user.id];
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

  const handleClickButton = (data?: number) => () => {
    if (!selectedCard) return;

    switch (data) {
      case 2:
        // тут происходит голосование игрока
        dispatch(setVotedCardUser({ idUser: user.id, idCard: selectedCard }));
        setShowModal(true);
        break;
      default:
        // сетаю ассоциацию
        if (round === 1) {
          // при первом ходе когда игрок ведущий
          dispatch(updateAssociationText({ text: association }));
          dispatch(setVotedCardUser({ idUser: user.id, idCard: -1 }));
        }

        dispatch(setSelectedCardUser({ idUser: user.id, idCard: selectedCard }));

        setShowModal(true);
        console.log({ round });
        // тут рандом выбора ботами карт на ассоциацию
        Object.entries(dataUser).forEach(([key, item], idx) => {
          const keyUser = Number(key);
          if (leaderUserId !== null && keyUser !== leaderUserId && keyUser !== user.id) {
            setTimeout(() => {
              dispatch(setSelectedCardUser({ idUser: keyUser, idCard: item.cards[0] }));
            }, 1000 * (idx + 1));
          }
        });
    }
  };

  return {
    mode,
    role,
    activeUser,
    handleClickButtonCard,
    association,
    onChange,
    handleClickButton,
    selectedCard,
    showModal,
    setShowModal,
    showModalChoice,
    leadUser: dataUser[leaderUserId as number],
    selectedCards,
  };
};
