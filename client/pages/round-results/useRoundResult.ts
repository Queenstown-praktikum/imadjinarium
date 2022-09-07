import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { playersSelectors, PlayerType } from '../../redux/slices/players';
import { gameSelectors } from '../../redux/slices/game';

type DataProps = {
  id: number;
  idCard: number;
  votedId: number[];
  name: string;
};

export const useRoundResult = () => {
  const players = useSelector(playersSelectors.players);
  const leaderUserId = useSelector(gameSelectors.leaderUserId);
  const associationText = useSelector(gameSelectors.associationText);

  const [data, setDate] = useState<DataProps[]>([]);
  const [leadPlayer, setLeadPlayer] = useState<PlayerType>();

  useEffect(() => {
    if (!players || !leadPlayer) return;

    const localData: DataProps[] = Object.values(players).map((item) => {
      const localValeId: number[] = [];

      Object.values(players).forEach((i) => {
        if (item.selectedCardId === i.votedCardId) {
          localValeId.push(i.id);
        }
      });

      return {
        id: item.id,
        idCard: item.selectedCardId !== null ? item.selectedCardId : 0,
        name: leadPlayer.id === item.id ? 'Ваша карта' : item.name,
        votedId: localValeId,
      };
    });

    setDate(localData);
  }, [players, leadPlayer]);

  useEffect(() => {
    if (!players || !leaderUserId) return;
    setLeadPlayer(players[leaderUserId]);
  }, [players, leaderUserId]);

  return { data, leadPlayer, associationText };
};
