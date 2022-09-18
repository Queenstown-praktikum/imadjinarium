import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
// import { playersSelectors } from '../../redux/slices/players';
import {
  filtersCardUsers,
  gameSelectors,
  resetSelectedCardUser,
  resetVotedCardUser,
  updateLeaderUserId,
} from '../../redux/slices/game';

type DataUser = {
  id: number;
  name: string;
  count: number;
};

export const useResultRound = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localData, setLocalData] = useState<DataUser[]>([]);
  // const players = useSelector(playersSelectors.players);
  const leaderUserId = useSelector(gameSelectors.leaderUserId);
  const playersId = useSelector(gameSelectors.playersId);

  // const dataUser = useSelector(gameSelectors.dataUser);
  const selectedCards = useSelector(gameSelectors.selectedCards);
  const votedCards = useSelector(gameSelectors.votedCards);
  const dataResultPage = useSelector(gameSelectors.dataResultPage);

  console.log({ dataResultPage });
  useEffect(() => {
    if (!dataResultPage?.length) return;
    let data: DataUser[] = [];
    const idUserSelectedCard = dataResultPage.filter((item) => item.votedId.length !== 0).map((item) => item.id);
    if (leaderUserId && idUserSelectedCard.includes(leaderUserId)) {
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
    } else if (leaderUserId && !idUserSelectedCard.includes(leaderUserId)) {
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
    setLocalData(data);
  }, [dataResultPage, leaderUserId]);

  const handleClickButton = () => {
    if (playersId.length) {
      dispatch(updateLeaderUserId({ id: playersId[0] }));
      dispatch(filtersCardUsers({ data: selectedCards }));
      dispatch(resetSelectedCardUser());
      dispatch(resetVotedCardUser());
      navigate('/game/round-intro-leading');
    }
  };

  return {
    data: localData,
    handleClickButton,
  };
};
