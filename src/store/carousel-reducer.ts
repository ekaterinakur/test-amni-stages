import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CarouselSize } from '../types';

export interface CarouselState {
  size: CarouselSize;
	color: string;
}

const initialState: CarouselState = {
	size: 'narrow',
	color: 'green',
}

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    changeCarouselSize: (state, action: PayloadAction<CarouselSize>) => {
      state.size = action.payload;
    },
    changeCarouselColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
})

export const { 
	changeCarouselSize, changeCarouselColor
} = carouselSlice.actions;

export default carouselSlice.reducer;
