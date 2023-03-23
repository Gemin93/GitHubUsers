import { GithubAPI, GithubUser } from '../features/UsersPage/types';
import { UserRepoDetails } from '../features/UserProfilePage/types';

const API_KEY = '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';

const headers = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const apiFetchUsers = (): Promise<GithubAPI> => {
  return fetch('https://api.github.com/users').then((response) => response.json());
};

export const apiFetchSearch = (query: string): Promise<GithubUser> => {
  return fetch(`https://api.github.com/search/users?q=${query}`, headers).then((response) => response.json());
};

export const apiFetchDetails = (login: string): Promise<GithubAPI> => {
  return fetch(`https://api.github.com/users/${login}`, headers).then((response) => response.json());
};

export const apiFetchFullInfoOfUser = (id: number): Promise<GithubUser> => {
  return fetch(`https://api.github.com/users/${id}`, headers).then((response) => response.json());
};
export const apiFetchRepos = (id: number): Promise<UserRepoDetails> => {
  return fetch(`https://api.github.com/users/${id}/repos`, headers).then((response) => response.json());
};
