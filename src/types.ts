export interface UsersSearch {
  items: UsersData[];
}
export interface UsersData {
  id: number;
  login: string;
  avatar_url: string;
}
export interface UsersDetails {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  company: string;
  public_repos: number;
  blog: string;
}
export interface UserRepoDetails {
  name: string;
  description: string;
  html_url: string;
}
export interface UsersRandom {
  login: string;
}

export interface UsersDetailsGet {
  items: UsersDetails[];
}

export interface GithubUser {
  id: number;
  login: string;
  name: string;
  avatar_url?: string;
  followers: number;
  following: number;
  company?: string;
  public_repos: number;
  blog?: string;
}
export const API_KEY = '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';
