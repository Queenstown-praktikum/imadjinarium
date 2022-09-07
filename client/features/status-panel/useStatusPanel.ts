import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { playersSelectors } from '../../redux/slices/players';
import { ItemStatusProps, LeaderUserId } from './types';
import { gameSelectors } from '../../redux/slices/game';

type IdItem = number;

type DataProps = Record<IdItem, ItemStatusProps | LeaderUserId>;

export const useStatusPanel = () => {
  const players = useSelector(playersSelectors.players);
  const leaderUserId = useSelector(gameSelectors.leaderUserId);

  const [data, setData] = useState<DataProps>({});

  useEffect(() => {
    if (!players || !leaderUserId) return;

    const setStatus = (id: number | null) => (id ? 'checked' : 'pending');

    const localData = Object.values(players).reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: {
          id: item.id,
          name: item.name,
          avatar: item.avatar,
          status: setStatus(item.selectedCardId),
          leading: leaderUserId === item.id,
        },
      }),
      {},
    );

    setData(localData);
  }, [players, leaderUserId]);

  return { data };
};
