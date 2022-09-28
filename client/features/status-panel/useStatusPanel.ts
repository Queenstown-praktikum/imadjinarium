import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// import { playersSelectors } from '../../redux/slices/players';
import { ItemStatusProps, LeaderUserId } from './types';
import { gameSelectors, setVotedCardUser } from '../../redux/slices/game';
import { useAppDispatch } from '../../hooks/redux';
import { userSelectors } from '../../redux/slices/user';
import { randomItem } from '../../utils/shuffle';

type IdItem = number;

type DataProps = Record<IdItem, ItemStatusProps | LeaderUserId>;

export const useStatusPanel = (p: { close: () => void; mode?: 'vote' }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector(userSelectors.user);
  const leaderUserId = useSelector(gameSelectors.leaderUserId);
  const dataUser = useSelector(gameSelectors.dataUser);
  const selectedCards = useSelector(gameSelectors.selectedCards);
  const votedCards = useSelector(gameSelectors.votedCards);
  const round = useSelector(gameSelectors.round);

  const [data, setData] = useState<DataProps>({});

  console.log({ selectedCards });
  console.log('PROPS ->', { p });
  useEffect(() => {
    // тут рандом выбора ботами карт при голосовании
    if (!Object.values(selectedCards).length) return;

    if (round === 1 || p.mode === 'vote') {
      const mass = Object.values(selectedCards).map((item) => item);
      if (mass.length === Object.values(dataUser).length) {
        Object.values(dataUser).forEach((item, idx) => {
          const _mass = mass.filter((item) => leaderUserId !== null && selectedCards[leaderUserId] !== item);
          if (p.mode === 'vote' && user.id !== item.id) {
            setTimeout(() => {
              dispatch(setVotedCardUser({ idUser: item.id, idCard: randomItem(_mass) }));
            }, 1000 * (idx + 1));
          } else if (item.id !== leaderUserId && user.id !== item.id) {
            setTimeout(() => {
              dispatch(setVotedCardUser({ idUser: item.id, idCard: randomItem(_mass) }));
            }, 1000 * (idx + 1));
          }
        });
      }
    }
  }, [selectedCards, round]);

  useEffect(() => {
    if (leaderUserId === null) return;
    const setStatus = (id: number | null) => (id ? 'checked' : 'pending');

    if (round === 1 || p.mode === 'vote') {
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
    } else {
      const localData = Object.values(dataUser).reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            id: item.id,
            name: item.name,
            avatar: item.avatar,
            status: setStatus(selectedCards[item.id]),
            leading: leaderUserId === item.id,
          },
        }),
        {},
      );

      setData(localData);

      const massSelected = Object.values(selectedCards).map((item) => item);
      if (massSelected.length === Object.values(dataUser).length) {
        navigate('/game/round-intro-player');
        p?.close();
      }
    }
  }, [leaderUserId, votedCards, dataUser, round, selectedCards]);

  return { data };
};
