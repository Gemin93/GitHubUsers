import React, { FC, useEffect, useState } from 'react';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { Header } from '../Header/Header';
import { Route, Switch } from 'react-router-dom';
import { UsersData, UsersSearch } from '../../types';

export const App: FC = () => {
  const [users, setUsers] = useState<UsersSearch>({ items: [] });
  const [search, setSearch] = useState('defunct');
  const [searchTerm, setSearchTerm] = useState('defunct');
  const [selectedUser, onSelectedUser] = useState('defunct');

  const onSearchClick = () => {
    setSearchTerm(search);
  };

  //загрузка пользователй
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

  // useEffect(() => {
  //   if (selectedUser) {
  //     fetch(`https://api.github.com/users/${selectedUser}`, {
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((response) => {
  //         setUsers(response);
  //         console.log(response);
  //       });
  //   }
  // }, []);
  console.log(selectedUser);

  return (
    <>
      <Header search={search} setSearch={setSearch} onClick={onSearchClick} />
      <Switch>
        <Route path="/users/:id">
          <UserProfilePage />
        </Route>
        <Route path="/">
          <UsersPage user={users} select={selectedUser} onSelect={onSelectedUser} />
        </Route>
        {/*Настроить редирект на / */}
        {/*<Route path="*">*/}
        {/*  <UsersPage />*/}
        {/*</Route>*/}
      </Switch>
    </>
  );
};
