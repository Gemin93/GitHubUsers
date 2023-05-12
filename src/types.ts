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
