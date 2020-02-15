import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uuid } from 'uuidv4';
import { replaceInPlace } from './utils';

export type Card = {
  id: string;
  name: string;
  values: {
    [propertyId: string]: string;
  };
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
    editCard: (state, action: PayloadAction<Card>) => {
      return replaceInPlace(state, action.payload);
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      return state.filter(card => card.id !== action.payload);
    },
  },
});
export const { addCard, deleteCard, editCard } = cardsSlice.actions;

export default cardsSlice.reducer;
