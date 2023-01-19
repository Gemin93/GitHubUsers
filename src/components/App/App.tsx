import React, { FC, useEffect, useState } from 'react';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { Header } from '../Header/Header';
import { Route, Switch } from 'react-router-dom';
import { GithubUser, API_KEY, UserRepoDetails } from '../../types';

export const App: FC = () => {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [randomUsers, setRandomUsers] = useState<GithubUser[]>([]);

  const [usersDetails, setUsersDetails] = useState<GithubUser>({
    id: 0,
    login: '',
    name: '',
    avatar_url: '',
    followers: 0,
    public_repos: 0,
    company: '',
    following: 0,
    blog: '',
  });
  const [userRepos, setUserRepos] = useState<UserRepoDetails[]>([]);

  const [search, setSearch] = useState('gemin');
  const [searchTerm, setSearchTerm] = useState('defunct');
  const [selectedUser, setSelectedUser] = useState('');

  const onSearchClick = () => {
    setSearchTerm(search);
  };

  //загрузка пользователей для страницы поиска
  useEffect(() => {
    console.log('sync search');
    fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response: GithubUser[]) => {
        setUsers(response);
      });
  }, [searchTerm]);

  // загрузка случайных пользователей
  useEffect(() => {
    console.log('sync users');
    fetch('https://api.github.com/users', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((response: GithubUser[]) => {
        setRandomUsers(response);
      });
    // fetch(`https://api.github.com/users/${randomUser.login}`, {
    //   headers: {
    //     Accept: 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setRandomUserDetail(response);
    //   });
  }, []);

  // загрузка инфрмации о конкретном пользователе
  useEffect(() => {
    if (selectedUser) {
      // запрос общей информации
      fetch(`https://api.github.com/users/${selectedUser}`, {
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response: GithubUser) => {
          setUsersDetails(response);
        });

      // запрос информации о репозитории
      fetch(`https://api.github.com/users/${selectedUser}/repos`, {
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response: UserRepoDetails[]) => {
          setUserRepos(response);
        });
    }
  }, [selectedUser]);

  return (
    <>
      <Header search={search} setSearch={setSearch} onClick={onSearchClick} />
      <Switch>
        <Route path="/users/:id">
          <UserProfilePage details={usersDetails} reposDetails={userRepos} />
        </Route>
        <Route path="/search?query=:id">
          <UsersSearchPage users={users} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        <Route path="/users">
          <UsersPage users={randomUsers} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        <Route path="/">
          <UsersPage users={randomUsers} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        {/*Настроить редирект на / */}
        {/*<Route path="*">*/}
        {/*  <UsersPage />*/}
        {/*</Route>*/}
      </Switch>
    </>
  );
};
