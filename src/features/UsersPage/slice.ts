import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GithubUser } from './types';

interface InitialState {
  users: GithubUser[];
  usersDetail: GithubUser[];
}

const initialState: InitialState = {
  users: [],
  usersDetail: [],
};

export const usersSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<GithubUser[]>) => {
      state.users = action.payload;
    },
    setDetails: (state, action: PayloadAction<GithubUser[]>) => {
      state.usersDetail = action.payload;
    },
  },
});

export const { setUsers, setDetails } = usersSlice.actions;

export default usersSlice.reducer;
