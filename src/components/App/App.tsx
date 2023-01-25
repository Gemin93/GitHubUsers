import React, { FC, useEffect, useState } from 'react';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { Header } from '../Header/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import { GithubUser, API_KEY } from '../../types';

export const App: FC = () => {
  const [userFull, setUserFull] = useState<GithubUser[]>([]);

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
        // собираю логины полученных пользователей
        const arrLogin: string[] = Object.values(response).map((value) => {
          return value.login;
        });
        //массив запросов для каждого пользователя для уточнения
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
          // собираю логины полученных пользователей
          const arrLogin: string[] = response.items.map((value: { login: string }) => {
            return value.login;
          });
          //массив запросов для каждого пользователя для уточнения
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

  return (
    <>
      <Header value={searchTerm} selectUser={selectedUser} onSearch={setSearchTerm} onSelect={setSelectedUser} />
      <Switch>
        <Route path="/users/:id" exact>
          <UserProfilePage />
        </Route>
        <Route path="/search">
          <UsersSearchPage users={userFull} searchValue={searchTerm} onSelect={setSelectedUser} />
        </Route>
        <Route path="/users" exact>
          <UsersPage users={userFull} onSelect={setSelectedUser} />
        </Route>
        <Route path="/" exact>
          <UsersPage users={userFull} onSelect={setSelectedUser} />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};
