import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { PlayerMapType, playersSelectors, updatePlayers } from '../../redux/slices/players';
import { gameSelectors, updateLeaderUserId, updatePlayersRound } from '../../redux/slices/game';

export const useResultRound = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localData, setLocalData] = useState<PlayerMapType>();
  const players = useSelector(playersSelectors.players);
  const leaderUserId = useSelector(gameSelectors.leaderUserId);
  const playersId = useSelector(gameSelectors.playersId);

  useEffect(() => {
    if (!players || !leaderUserId) return;

    const leaderUser = players[leaderUserId];
    const cartIdLeader = leaderUser?.selectedCardId;

    // карты которые выбрали игроки
    const cardsVotedSelected: number[] = [];

    Object.values(players).forEach((item) => {
      if (item.votedCardId !== null) {
        cardsVotedSelected.push(item.votedCardId);
      }
    });

    let data = { ...players };

    // Все угадали карту ведущего
    const isAllLeaderCars = cardsVotedSelected.every((item) => item === cartIdLeader);

    if (isAllLeaderCars) {
      // при условии что все угадали карту ведущего
      // ведущий получает 0 очков остальные по 1
      data = Object.values(data).reduce((acc, item) => {
        if (item.id !== leaderUserId) {
          return { ...acc, [item.id]: { ...item, score: item.score + 1 } };
        } return { ...acc, [item.id]: item };
      }, {});
    } else {
      // проверяю выбрал ли кто карту ведущего
      const isOneLeaderCards = cardsVotedSelected.some((item) => item === cartIdLeader);

      if (isOneLeaderCards) {
        // если хотя бы один выбрал карту ведущего
        // ведущий получает 3 очка и по 1 за каждого кто угадал его карту
        // тот кто угадал карту ведущего получает 3 очка
        // и все игроки получают по 1 очку за тех кто выбрал их карту

        data = Object.values(data).reduce((acc, item) => {
          if (item.id === leaderUserId) {
            // считаю сколько игроков выбрало карту ведущего
            const count = cardsVotedSelected.reduce((acc, i) => (i === cartIdLeader ? acc++ : acc), 0);
            return { ...acc, [item.id]: { ...item, score: item.score + count + 3 } };
          } 
            if (item.votedCardId === cartIdLeader) {
              return { ...acc, [item.id]: { ...item, score: item.score + 3 } };
            }
            return { ...acc, [item.id]: item };
          
        }, {});

        data = Object.values(data).reduce((acc, item) => {
          if (item.selectedCardId) {
            const count = cardsVotedSelected.reduce((acc, i) => (i === item.selectedCardId ? acc++ : acc), 0);
            return { ...acc, [item.id]: { ...item, score: item.score + count } };
          } return { ...acc, [item.id]: item };
        }, {});
      } else {
        // ведущий получает 0 очков остальные по 1
        data = Object.values(data).reduce((acc, item) => {
          if (item.id !== leaderUserId) {
            return { ...acc, [item.id]: { ...item, score: item.score + 1 } };
          } return { ...acc, [item.id]: item };
        }, {});
      }
    }
    setLocalData(data);
    dispatch(updatePlayersRound(data));
  }, [leaderUserId, players]);

  const handleClickButton = () => {
    if (playersId.length) {
      dispatch(updateLeaderUserId({ id: playersId[0] }));
      navigate('/game/round-intro-leading');
      const data = Object.values(players).reduce(
        (acc, item) => ({ ...acc, [item.id]: { ...item, selectedCardId: null, votedCardId: null } }),
        {},
      );
      dispatch(updatePlayers(data));
    }
  };

  return {
    data: localData,
    handleClickButton,
  };
};
