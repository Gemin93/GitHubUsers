import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetchUsers, apiFetchDetails } from '../../app/api';
import { setUsers, setDetails } from './slice';

export const fetchUsers = createAsyncThunk('api/fetchUsers', (_, thunk) => {
  return apiFetchUsers().then((response) => {
    thunk.dispatch(setUsers(response.items));
  });
});

export const fetchDetails = createAsyncThunk('api/fetchDetails', (params: { login: string }, thunk) => {
  return apiFetchDetails(params.login).then((response) => {
    thunk.dispatch(setDetails(response.items));
  });
});
