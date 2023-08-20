import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IStage } from '../types';
import { mockedStages } from '../mocks';

export interface StagesState {
  stages: IStage[];
}

const initialState: StagesState = {
  stages: [],
	// stages: mockedStages,
}

export const stageSlice = createSlice({
  name: 'stages',
  initialState,
  reducers: {
    createStage: (state, action: PayloadAction<IStage>) => {
      state.stages = [...state.stages, action.payload];
    },
    updateStages: (state, action: PayloadAction<IStage[]>) => {
      state.stages = action.payload;
    },
    removeStage: (state, action: PayloadAction<string>) => {
			const filteredStages = state.stages.filter(stage => stage.id !== action.payload);
      state.stages = filteredStages;
    },
		resetStages: (state) => {
      state.stages = [];
    },
  },
})

export const { 
	createStage, updateStages, removeStage, resetStages,
} = stageSlice.actions;

export default stageSlice.reducer;
