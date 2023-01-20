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
  url: string;
}
export interface GithubUserSearch {
  items: GithubUser[];
}
export interface UserRepoDetails {
  name: string;
  description: string;
  html_url: string;
}
export interface UsersRandom {
  login: string;
}

export const API_KEY = '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';
