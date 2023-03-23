import { configureStore, ThunkDispatch, ThunkAction, PayloadAction } from '@reduxjs/toolkit';
//импортировать редьюсер
import usersSlice from '../../src/features/UsersPage/slice';

export const store = configureStore({
  reducer: {
    //добавить редьюсер
    usersSlice: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = ThunkDispatch<RootState, unknown, PayloadAction>;
export type AppAction<R> = ThunkAction<R, RootState, unknown, PayloadAction>;
