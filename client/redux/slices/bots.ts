import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationState } from '../store';

type IdUser = number;
export type UserDataProps = Record<IdUser, number[]>;

type StateType = {
  cards: UserDataProps;
};

const initialState: StateType = {
  cards: {},
};

const botsSlice = createSlice({
  name: 'bots',
  initialState,
  reducers: {
    // removeBotsCards: (state: StateType, action: PayloadAction<{ cards: number[] }>) => {
    //   // state.cards.filter((id: number) => action.payload.cards.includes(id));
    // },
    resetCards: (state: StateType) => {
      /* eslint-disable no-param-reassign */
      state.cards = [];
    },
    setBotCards: (state: StateType, action: PayloadAction<{ id: number; data: number[] }>) => ({
      ...state,
      cards: { ...state.cards, [action.payload.id]: action.payload.data },
    }),
  },
});

const {
  reducer: botsReducer,
  actions: { setBotCards },
} = botsSlice;

export { botsReducer, setBotCards };

export const botsSelectors = {
  cards: (s: ApplicationState) => s.bots.cards,
};
