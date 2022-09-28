import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationState } from '../store';

type IdUser = number;
export type UserDataProps = Record<IdUser, number[]>;

type StateType = {
  data: number[];
  user_data: UserDataProps;
};

const initialState: StateType = {
  data: new Array(60).fill('').map((_, index) => index + 1),
  user_data: {},
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    removeUsedCards: (state: StateType, action: PayloadAction<{ cards: number[] }>) => {
      state.data.filter((id: number) => action.payload.cards.includes(id));
    },
    resetCards: (state: StateType) => {
      /* eslint-disable no-param-reassign */
      state.data = [];
    },
    setUserCards: (state: StateType, action: PayloadAction<{ id: number; data: number[] }>) => ({
      ...state,
      user_data: { ...state.user_data, [action.payload.id]: [...action.payload.data] },
    }),
    updateCards: (state: StateType, action: PayloadAction<{ data: number[] }>) => ({
      ...state,
      data: action.payload.data,
    }),
  },
});

const {
  reducer: cardsReducer,
  actions: { removeUsedCards, setUserCards, updateCards },
} = cardsSlice;

export { cardsReducer, removeUsedCards, setUserCards, updateCards };

export const cardsSelectors = {
  cardsAll: (s: ApplicationState) => s.cards.data,
  cardsUser: (s: ApplicationState) => s.cards.user_data,
};
