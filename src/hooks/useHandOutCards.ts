import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer, playersSelectors, PlayerType } from '../redux/slices/players';
import { cardsSelectors, setUserCards } from '../redux/slices/cards';
import { userSelectors } from '../redux/slices/user';

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

export const useHandOutCards = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelectors.user);
  const players = useSelector(playersSelectors.players);
  const usersCards = useSelector(cardsSelectors.cardsUser);
  const cardsAll = [...useSelector(cardsSelectors.cardsAll)];

  useEffect(() => {
    dispatch(addPlayer(mockPlayer1));
    dispatch(addPlayer(mockPlayer2));
    dispatch(
      addPlayer({
        id: user.id,
        name: user.login,
        avatar: user.avatar || '',
        cards: [],
        score: 0,
        status: 'pending',
        selectedCardId: null,
        votedCardId: null,
      }),
    );
  }, []);

  useEffect(() => {
    if (!Object.values(players).length) return;
    Object.values(players).forEach(({ id }) => {
      const hangOutCards = cardsAll?.splice(0, 6);
      dispatch(setUserCards({ id, data: hangOutCards }));
    });
  }, [players]);

  return { usersCards, user };
};
