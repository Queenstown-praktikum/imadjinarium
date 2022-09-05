import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PlayerStatusType = 'pending' | 'ready'

export type PlayerType = {
  id: number;
  name: string;
  avatar: string;
  cards: number[];
  score: number;
  status: PlayerStatusType;
  selectedCardId: number | null;
  votedCardId: number | null;
}

export type PlayerMapType = Record<number, PlayerType>

const initialState: PlayerMapType = {}

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayer: (state: PlayerMapType, action: PayloadAction<PlayerType>) => (
      {...state, [action.payload.id]: action.payload}
    ),
    setPlayerCards: (state: PlayerMapType, action: PayloadAction<{playerId: number, cards: number[]}>) => {
      const player = state[action.payload.playerId]
      if (player) {
        return {...state, [action.payload.playerId]: {
          ...player,
          cards: action.payload.cards
        }}
      }
      return state;
    }
  },
});

const {
  reducer: playersReducer,
  actions: {
    addPlayer,
    setPlayerCards,
  },
} = playersSlice;

export {
  playersReducer,
  addPlayer,
  setPlayerCards,
};