import { RootState } from '../../app/store';
import { GithubUser } from './types';

export const getUsers = (state: RootState): GithubUser[] => state.usersSlice.users;
