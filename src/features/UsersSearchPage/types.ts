export interface GithubAPI {
  items: GithubUser[];
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
  url: string;
}
