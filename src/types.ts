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

export interface UserRepoDetails {
  name: string;
  description: string;
  html_url: string;
}

export const API_KEY = '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';
