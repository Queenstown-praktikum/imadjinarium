import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// import { playersSelectors } from '../../redux/slices/players';
import { ItemStatusProps, LeaderUserId } from './types';
import { gameSelectors, setVotedCardUser } from '../../redux/slices/game';
import { useAppDispatch } from '../../hooks/redux';
// import { userSelectors } from '../../redux/slices/user';

type IdItem = number;

type DataProps = Record<IdItem, ItemStatusProps | LeaderUserId>;

const randomItem = (arr: number[]) => arr[Math.floor(Math.random() * arr.length)];

export const useStatusPanel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const user = useSelector(userSelectors.user);
  const leaderUserId = useSelector(gameSelectors.leaderUserId);
  const dataUser = useSelector(gameSelectors.dataUser);
  const selectedCards = useSelector(gameSelectors.selectedCards);
  const votedCards = useSelector(gameSelectors.votedCards);

  const [data, setData] = useState<DataProps>({});

  useEffect(() => {
    // тут рандом выбора ботами карт при голосовании
    if (!Object.values(selectedCards).length) return;

    const mass = Object.values(selectedCards).map((item) => item);

    if (mass.length === Object.values(dataUser).length) {
      Object.values(dataUser).forEach((item, idx) => {
        if (item.id !== leaderUserId) {
          setTimeout(() => {
            dispatch(setVotedCardUser({ idUser: item.id, idCard: randomItem(mass) }));
          }, 1000 * (idx + 1));
        }
      });
    }
  }, [selectedCards]);

  useEffect(() => {
    if (!leaderUserId) return;

    const setStatus = (id: number | null) => (id ? 'checked' : 'pending');

    const localData = Object.values(dataUser).reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: {
          id: item.id,
          name: item.name,
          avatar: item.avatar,
          status: setStatus(votedCards[item.id]),
          leading: leaderUserId === item.id,
        },
      }),
      {},
    );

    setData(localData);

    const massVoted = Object.values(votedCards).map((item) => item);

    if (massVoted.length === Object.values(dataUser).length) {
      navigate('/game/round-results');
    }
  }, [leaderUserId, votedCards, dataUser]);

  return { data };
};
