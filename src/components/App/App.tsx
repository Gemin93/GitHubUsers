import React, { FC, useEffect, useState } from 'react';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { Header } from '../Header/Header';
import { Route, Switch } from 'react-router-dom';
import { GithubUser, API_KEY, UserRepoDetails, GithubUserSearch } from '../../types';

export const App: FC = () => {
  const [users, setUsers] = useState<GithubUser>({
    id: 0,
    login: '',
    name: '',
    avatar_url: '',
    followers: 0,
    public_repos: 0,
    company: '',
    following: 0,
    blog: '',
    url: '',
  });
  const [userFull, setUserFull] = useState<GithubUser[]>([]);

  const [userSearch, setUserSearch] = useState<GithubUser[]>([
    {
      id: 0,
      login: '',
      name: '',
      avatar_url: '',
      followers: 0,
      public_repos: 0,
      company: '',
      following: 0,
      blog: '',
      url: '',
    },
  ]);

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
    url: '',
  });
  const [userRepos, setUserRepos] = useState<UserRepoDetails[]>([]);

  const [search, setSearch] = useState('gemin');
  const [searchTerm, setSearchTerm] = useState('defunct');

  const [selectedUser, setSelectedUser] = useState('');

  const onSearchClick = () => {
    setSearchTerm(search);
  };

  // загрузка  пользователей
  useEffect(() => {
    console.log('sync users');
    fetch('https://api.github.com/users', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((response: GithubUser) => {
        setUsers(response);
        const arrUrl: string[] = Object.values(response).map((value) => {
          return value.url;
        });
        console.log(arrUrl);
        // Object.values(response).map((value) => {
        //   fetch(`https://api.github.com/users/${value.login}`, {
        //     headers: {
        //       Accept: 'application/json',
        //       Authorization: `Bearer ${API_KEY}`,
        //     },
        //   })
        //     .then((response) => response.json())
        //     .then((response: GithubUser) => {
        //       setUserFull([...userFull, response]);
        //       // setUserFull([...userFull, response]); // здесь уже ответ типа {user1 и его данные}, {user2 и его данные}, ..
        //     });
        // });
      });
  }, []);

  //второй запрос который выдаёт 30 отдельных объектов
  // fetch(`https://api.github.com/users/${value.login}`, {
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: `Bearer ${API_KEY}`,
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((response: GithubUser) => {
  //     setUsers(response);
  //   })

  // загрузка пользователей для страницы поиска
  // useEffect(() => {
  //   console.log('sync search');
  //   fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       const searchedUser: GithubUserSearch = response;
  //       setUserSearch(searchedUser.items);
  //       console.log(searchedUser.items);
  //     });
  // }, [searchTerm]);

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
          <UsersSearchPage users={userFull} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        <Route path="/users">
          <UsersPage users={userFull} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        <Route path="/">
          <UsersPage users={userFull} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        {/*Настроить редирект на / */}
        {/*<Route path="*">*/}
        {/*  <UsersPage />*/}
        {/*</Route>*/}
      </Switch>
    </>
  );
};
