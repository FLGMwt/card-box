import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uuid } from 'uuidv4';

export type Card = {
  name: string;
  id: string;
};

type CardCreateModel = Omit<Card, 'id'>;

const initialState: Card[] = [];

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardCreateModel>) => {
      return [
        ...state,
        {
          id: uuid(),
          ...action.payload,
        },
      ];
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      return state.filter(card => card.id !== action.payload);
    },
  },
});
export const { addCard, deleteCard } = cardsSlice.actions;

export default cardsSlice.reducer;
