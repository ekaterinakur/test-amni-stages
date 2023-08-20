import { configureStore } from '@reduxjs/toolkit';
import stagesReducer from './stages-reducer';
import carouselReducer from './carousel-reducer';

export const store = configureStore({
  reducer: {
		stages: stagesReducer,
		carousel: carouselReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
