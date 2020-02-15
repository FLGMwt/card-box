import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uuid } from 'uuidv4';
import { replaceInPlace } from './utils';

export type Property = {
  id: string;
  name: string;
  top: number;
  left: number;
};

type PropertyCreateModel = Omit<Property, 'id'>;

const initialState: Property[] = [];

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    addProperty: (state, action: PayloadAction<PropertyCreateModel>) => {
      return [
        ...state,
        {
          id: uuid(),
          ...action.payload,
        },
      ];
    },
    editProperty: (state, action: PayloadAction<Property>) => {
      return replaceInPlace(state, action.payload);
    },
    deleteProperty: (state, action: PayloadAction<string>) => {
      return state.filter(property => property.id !== action.payload);
    },
  },
});
export const {
  addProperty,
  editProperty,
  deleteProperty,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
