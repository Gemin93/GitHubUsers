import React, { FC, useEffect, useState } from 'react';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { Header } from '../Header/Header';
import { Route, Switch, useLocation } from 'react-router-dom';
import { GithubUser, API_KEY, UserRepoDetails } from '../../types';

export const App: FC = () => {
  const [userFull, setUserFull] = useState<GithubUser[]>([]);

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

  const [searchTerm, setSearchTerm] = useState<string>('');

  const [selectedUser, setSelectedUser] = useState('');
  // загрузка  пользователей
  useEffect(() => {
    fetch('https://api.github.com/users', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((response: GithubUser) => {
        const arrLogin: string[] = Object.values(response).map((value) => {
          return value.login;
        });
        const arrFetchUsers = arrLogin.map((login) =>
          fetch(`https://api.github.com/users/${login}`, {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            },
          }).then((response) => response.json())
        );

        Promise.all(arrFetchUsers).then((responses) => {
          const userInfo: GithubUser[] = responses;
          setUserFull(userInfo);
        });
      });
    console.log('sync users');
  }, [searchTerm]);

  // загрузка пользователей для страницы поиска
  useEffect(() => {
    searchTerm !== '' &&
      fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const arrLogin: string[] = response.items.map((value: { login: string }) => {
            return value.login;
          });
          console.log(arrLogin);

          const arrFetchUsers = arrLogin.map((login) =>
            fetch(`https://api.github.com/users/${login}`, {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`,
              },
            }).then((response) => response.json())
          );

          Promise.all(arrFetchUsers).then((responses) => {
            const userInfo: GithubUser[] = responses;
            setUserFull(userInfo);
          });
        });
    console.log('sync search');
  }, [searchTerm]);

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
      <Header
        value={searchTerm}
        onSearch={(value: string) => {
          setSearchTerm(value);
        }}
      />
      <Switch>
        <Route path="/users/:id" exact>
          <UserProfilePage details={usersDetails} reposDetails={userRepos} />
        </Route>
        <Route path="/search">
          <UsersSearchPage users={userFull} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        <Route path="/users" exact>
          <UsersPage users={userFull} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        <Route path="/" exact>
          <UsersPage users={userFull} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        {/*/!*Настроить редирект на / *!/*/}
        {/*<Route path="*">*/}
        {/*  <UsersPage />*/}
        {/*</Route>*/}
      </Switch>
    </>
  );
};

// eslint-disable-next-line react/prop-types,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
