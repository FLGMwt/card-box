import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uuid } from 'uuidv4';

type CardCreateModel = {
  name: string;
};

type Card = CardCreateModel & {
  id: string;
};

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
