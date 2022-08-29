import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number[] = new Array(60).fill('').map((_, index) => index + 1)

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    removeUsedCards: (state: number[], action: PayloadAction<{cards: number[]}>) => (
      state.filter((id: number) => action.payload.cards.includes(id))
    ),
    resetCards: () => initialState,
  },
});

const {
  reducer: cardsReducer,
  actions: {
    removeUsedCards,
  },
} = cardsSlice;

export {
  cardsReducer,
  removeUsedCards,
};
