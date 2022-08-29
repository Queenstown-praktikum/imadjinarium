import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer, PlayerType, setPlayerCards } from '../redux/slices/players';
import { ApplicationState } from '../redux/store';


const mockPlayer1: PlayerType = {
  id: 1,
  name: 'Den',
  avatar: '',
  cards: [],
  score: 0,
  status: 'pending',
  selectedCardId: null,
  votedCardId: null,
}

const mockPlayer2: PlayerType = {
  id: 2,
  name: 'Den2',
  avatar: '',
  cards: [],
  score: 0,
  status: 'pending',
  selectedCardId: null,
  votedCardId: null,
}

export const useHandOutCards = () => {
  const user = useSelector((state: ApplicationState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addPlayer(mockPlayer1))
    dispatch(addPlayer(mockPlayer2))
    dispatch(addPlayer({
      id: user.id,
      name: user.login,
      avatar: user.avatar || '',
      cards: [],
      score: 0,
      status: 'pending',
      selectedCardId: null,
      votedCardId: null,
    }))
  }, [])

  const players = useSelector((state: ApplicationState) => state.players)

  const cards = useSelector((state: ApplicationState) => [...state.cards])
  
  useEffect(() => {
    Object.values(players).forEach(({id}) => {
      const hangOutCards = cards.splice(0, 6)
      dispatch(setPlayerCards({ playerId: id, cards: hangOutCards}))
    })
  }, [])
}