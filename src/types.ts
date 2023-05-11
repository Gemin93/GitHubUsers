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
