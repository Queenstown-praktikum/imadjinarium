import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  DataUserGameProps,
  filtersCardUsers,
  gameSelectors,
  resetSelectedCardUser,
  resetVotedCardUser,
  setDataUser,
  updateAssociationText,
  updateDataResultGame,
  updateLeaderUserId,
  updateRound,
} from '../../redux/slices/game';
import { userSelectors } from '../../redux/slices/user';

export const useResultRound = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localData, setLocalData] = useState<DataUserGameProps[]>([]);
  const [showModalFinish, setShowModalFinish] = useState<boolean>(false);

  const user = useSelector(userSelectors.user);
  const leaderUserId = useSelector(gameSelectors.leaderUserId);
  const playersId = useSelector(gameSelectors.playersId);
  const dataUserGame = useSelector(gameSelectors.dataUserGame);

  // const dataUser = useSelector(gameSelectors.dataUser);
  const selectedCards = useSelector(gameSelectors.selectedCards);
  const votedCards = useSelector(gameSelectors.votedCards);
  const dataResultPage = useSelector(gameSelectors.dataResultPage);

  useEffect(() => {
    if (!dataResultPage?.length) return;
    let data: DataUserGameProps[] = [];
    const idUserSelectedCard = dataResultPage.filter((item) => item.votedId.length !== 0).map((item) => item.id);
    if (leaderUserId !== null && idUserSelectedCard.includes(leaderUserId)) {
      // кто то угадал карту ведущего
      if (idUserSelectedCard.length === 1) {
        // карету ведущего угадали все
        data = dataResultPage.map((item) => {
          if (item.id === leaderUserId) {
            return {
              id: item.id,
              name: item.name,
              count: 0,
            };
          }
          return {
            id: item.id,
            name: item.name,
            count: item.votedId.length !== 0 ? 1 : 0,
          };
        });
      } else {
        // ктото угадал карту ведущего
        data = dataResultPage.map((item) => {
          if (item.id === leaderUserId) {
            return {
              id: item.id,
              name: item.name,
              count: item.votedId.length + 3,
            };
          }
          return {
            id: item.id,
            name: item.name,
            count: votedCards[item.id] === selectedCards[leaderUserId] ? 3 : 0,
          };
        });
      }
    } else if (leaderUserId !== null && !idUserSelectedCard.includes(leaderUserId)) {
      // никто не угадал карту ведущего
      data = dataResultPage.map((item) => {
        if (item.id === leaderUserId) {
          return {
            id: item.id,
            name: item.name,
            count: 0,
          };
        }
        return {
          id: item.id,
          name: item.name,
          count: item.votedId.length !== 0 ? 1 : 0,
        };
      });
    }

    data = data.map((item) => {
      if (item.id === user.id) {
        return { ...item, name: user.login };
      }
      return item;
    });

    setLocalData(data);

    if (dataUserGame?.length) {
      const _data = dataUserGame.map((item, idx) => ({ ...item, count: item.count + data[idx].count }));

      dispatch(updateDataResultGame({ data: _data }));
    } else {
      dispatch(updateDataResultGame({ data }));
    }
  }, [dataResultPage, leaderUserId]);

  const handleClickButton = () => {
    if (showModalFinish) {
      // Завершение игры
      // Сброс всех значений
      dispatch(setDataUser({ data: {} }));
      dispatch(updateDataResultGame({ data: [] }));
      dispatch(updateLeaderUserId({ id: null }));
      dispatch(filtersCardUsers({ data: {} }));
      dispatch(resetSelectedCardUser());
      dispatch(resetVotedCardUser());
      dispatch(updateRound({ round: 1 }));
      dispatch(updateAssociationText({ text: '' }));
      navigate('/game/initial');
    } else if (playersId.length) {
      // Сбрасываем все
      dispatch(updateDataResultGame({ data: [] }));
      dispatch(updateLeaderUserId({ id: playersId[0] }));
      dispatch(filtersCardUsers({ data: selectedCards }));
      dispatch(resetSelectedCardUser());
      dispatch(resetVotedCardUser());
      dispatch(updateRound({ round: 2 }));
      dispatch(updateAssociationText({ text: '' }));
      navigate('/game/round-intro-leading');
    } else {
      const data = [...dataUserGame].sort((a, b) => b.count - a.count);
      dispatch(updateDataResultGame({ data }));
      setLocalData(data);
      // p.close();
      setShowModalFinish(true);
      dispatch(updateRound({ round: 3 }));
    }
  };

  return {
    showModalFinish,
    playersId,
    data: localData,
    handleClickButton,
  };
};
