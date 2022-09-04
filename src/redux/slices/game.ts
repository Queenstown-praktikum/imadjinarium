import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationState } from '../store';

type IdUser = number;
export type UserDataProps = Record<IdUser, number[]>;

type StateType = {
  leaderUserId: number | null;
  associationText: string;
  round: number;
};

const initialState: StateType = {
  leaderUserId: null,
  associationText: '',
  round: 1,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateLeaderUserId: (state: StateType, action: PayloadAction<{ id: number }>) => {
      /* eslint-disable no-param-reassign */
      state.leaderUserId = action.payload.id;
    },
    updateAssociationText: (state: StateType, action: PayloadAction<{ text: string }>) => {
      /* eslint-disable no-param-reassign */
      state.associationText = action.payload.text;
    },
    updateRound: (state: StateType, action: PayloadAction<{ round: number }>) => {
      /* eslint-disable no-param-reassign */
      state.round = action.payload.round;
    },
  },
});

const {
  reducer: gameReducer,
  actions: { updateLeaderUserId, updateAssociationText, updateRound },
} = gameSlice;

export { gameReducer, updateLeaderUserId, updateAssociationText, updateRound };

export const gameSelectors = {
  leaderUserId: (s: ApplicationState) => s.game.leaderUserId,
  associationText: (s: ApplicationState) => s.game.associationText,
  round: (s: ApplicationState) => s.game.round,
};
