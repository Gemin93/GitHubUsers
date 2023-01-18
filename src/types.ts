export interface UsersSearch {
  items: UsersData[];
}
export interface UsersData {
  id: number;
  login: string;
  avatar_url: string;
  repos: number;
  company: string;
}
export interface UsersDetails {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  repos: number;
  repos_url: string;
  following: number;
  blog: string;
}
export interface UsersRandom {
  login: string;
}
