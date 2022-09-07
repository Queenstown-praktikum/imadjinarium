import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationState } from '../store';
import { PlayerMapType } from './players';

type IdUser = number;
export type UserDataProps = Record<IdUser, number[]>;

type StateType = {
  leaderUserId: number | null;
  associationText: string;
  round: number;
  playersId: number[]; // тут лежат id всех игроков
  selectedCardId: Record<number, number>;
  votedCardId: Record<number, number>;
  playersRound: PlayerMapType;
};

const initialState: StateType = {
  leaderUserId: null,
  associationText: '',
  round: 1,
  playersId: [],
  selectedCardId: {},
  votedCardId: {},
  playersRound: {},
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateLeaderUserId: (state: StateType, action: PayloadAction<{ id: number }>) => {
      /* eslint-disable no-param-reassign */
      state.leaderUserId = action.payload.id;
      state.playersId = state.playersId.filter((item) => item !== action.payload.id);
    },
    updateAssociationText: (state: StateType, action: PayloadAction<{ text: string }>) => {
      /* eslint-disable no-param-reassign */
      state.associationText = action.payload.text;
    },
    updateRound: (state: StateType, action: PayloadAction<{ round: number }>) => {
      /* eslint-disable no-param-reassign */
      state.round = action.payload.round;
    },
    setPlayers: (state: StateType, action: PayloadAction<{ data: number[] }>) => {
      /* eslint-disable no-param-reassign */
      state.playersId = action.payload.data;
    },
    addSelectedId: (state: StateType, action: PayloadAction<{ id: number; value: number }>) => {
      /* eslint-disable no-param-reassign */
      state.selectedCardId = {
        ...state.selectedCardId,
        [action.payload.id]: action.payload.value,
      };
    },
    addVotedId: (state: StateType, action: PayloadAction<{ id: number; value: number }>) => {
      /* eslint-disable no-param-reassign */
      state.votedCardId = {
        ...state.votedCardId,
        [action.payload.id]: action.payload.value,
      };
    },
    updatePlayersRound: (state: StateType, action: PayloadAction<PlayerMapType>) => {
      /* eslint-disable no-param-reassign */
      state.playersRound = action.payload;
    },
  },
});

const {
  reducer: gameReducer,
  actions: {
    updateLeaderUserId,

    updateAssociationText,
    updateRound,
    addSelectedId,
    addVotedId,
    updatePlayersRound,
    setPlayers,
  },
} = gameSlice;

export {
  gameReducer,
  updateLeaderUserId,
  updateAssociationText,
  updateRound,
  addSelectedId,
  addVotedId,
  updatePlayersRound,
  setPlayers,
};

export const gameSelectors = {
  game: (s: ApplicationState) => s.game,
  leaderUserId: (s: ApplicationState) => s.game.leaderUserId,
  associationText: (s: ApplicationState) => s.game.associationText,
  round: (s: ApplicationState) => s.game.round,
  selectedCardId: (s: ApplicationState) => s.game.selectedCardId,
  votedCardId: (s: ApplicationState) => s.game.votedCardId,
  playersRound: (s: ApplicationState) => s.game.playersRound,
  playersId: (s: ApplicationState) => s.game.playersId,
};
