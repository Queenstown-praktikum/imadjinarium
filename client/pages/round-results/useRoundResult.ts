import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { playersSelectors, PlayerType } from '../../redux/slices/players';
import { gameSelectors, ItemDataUserProps } from '../../redux/slices/game';
import { userSelectors } from '../../redux/slices/user';
// import { userSelectors } from '../../redux/slices/user';
// import { useAppDispatch } from '../../hooks/redux';

type DataProps = {
  id: number;
  idCard: number;
  votedId: number[];
  name: string;
};

export const useRoundResult = () => {
  // const dispatch = useAppDispatch();
  const user = useSelector(userSelectors.user);
  const leaderUserId = useSelector(gameSelectors.leaderUserId);
  const associationText = useSelector(gameSelectors.associationText);
  const dataUser = useSelector(gameSelectors.dataUser);
  const selectedCards = useSelector(gameSelectors.selectedCards);
  const votedCards = useSelector(gameSelectors.votedCards);

  const [data, setDate] = useState<DataProps[]>([]);
  const [leadPlayer, setLeadPlayer] = useState<ItemDataUserProps>();

  useEffect(() => {
    if (!leadPlayer) return;

    const localData: DataProps[] = Object.values(dataUser).map((item) => {
      const localValeId: number[] = [];

      Object.entries(votedCards).forEach(([key, itemCard]) => {
        const keyCard = Number(key);
        if (selectedCards[item.id] === itemCard) {
          localValeId.push(keyCard);
        }
      });

      return {
        id: item.id,
        idCard: selectedCards[item.id],
        name: user.id === item.id ? 'Ваша карта' : item.name,
        votedId: localValeId,
      };
    });

    setDate(localData);
  }, [dataUser, selectedCards, votedCards, leadPlayer]);

  useEffect(() => {
    if (leaderUserId === null) return;
    setLeadPlayer(dataUser[leaderUserId]);
  }, [dataUser, leaderUserId]);

  return { data, leadPlayer, associationText };
};
