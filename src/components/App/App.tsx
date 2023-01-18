import React, { FC, useEffect, useState } from 'react';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { Header } from '../Header/Header';
import { Route, Switch } from 'react-router-dom';
import { UsersDetails, UsersSearch, UsersRandom } from '../../types';

export const App: FC = () => {
  const [users, setUsers] = useState<UsersSearch>({ items: [] });
  const [usersDetails, setUsersDetails] = useState<UsersDetails>({
    id: 0,
    login: '',
    name: '',
    avatar_url: '',
    followers: 0,
    repos: 0,
    repos_url: '',
    following: 0,
    blog: '',
  });
  const [randomUser, setRandomUser] = useState<UsersRandom>({
    login: '',
  });
  const [randomUserDetail, setRandomUserDetail] = useState<UsersSearch>({ items: [] });
  const [search, setSearch] = useState('defunct');
  const [searchTerm, setSearchTerm] = useState('defunct');
  const [selectedUser, setSelectedUser] = useState('');

  const onSearchClick = () => {
    setSearchTerm(search);
  };

  //загрузка пользователей для страницы поиска
  useEffect(() => {
    fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
      });
  }, [searchTerm]);

  // загрузка случайных пользователей
  useEffect(() => {
    console.log('sync details');

    fetch('https://api.github.com/users', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response: UsersRandom) => {
        setRandomUser(response);
      });

    fetch(`https://api.github.com/users/${randomUser.login}`, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setRandomUserDetail(response);
      });
  }, [selectedUser]);

  // загрузка инфрмации о конкретном пользователе
  useEffect(() => {
    console.log('sync details');
    if (selectedUser) {
      fetch(`https://api.github.com/users/${selectedUser}`, {
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response: UsersDetails) => {
          setUsersDetails(response);
        });
    }
  }, [selectedUser]);
  // console.log(selectedUser);
  console.log(usersDetails);

  return (
    <>
      <Header search={search} setSearch={setSearch} onClick={onSearchClick} />
      <Switch>
        <Route path="/users/:id">
          <UserProfilePage details={usersDetails} />
        </Route>
        <Route path="/search?query=:id">
          <UsersSearchPage user={users} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        <Route path="/users">
          <UsersPage user={users} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        <Route path="/">
          <UsersPage user={users} select={selectedUser} onSelect={setSelectedUser} />
        </Route>
        {/*Настроить редирект на / */}
        {/*<Route path="*">*/}
        {/*  <UsersPage />*/}
        {/*</Route>*/}
      </Switch>
    </>
  );
};
