import React, { FC, useState } from 'react';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { Header } from '../Header/Header';
import { Route, Switch, Redirect } from 'react-router-dom';

export const App: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [selectedUser, setSelectedUser] = useState('');

  return (
    <>
      <Header value={searchTerm} selectUser={selectedUser} onSearch={setSearchTerm} onSelect={setSelectedUser} />
      <Switch>
        <Route path="/users/:id" exact>
          <UserProfilePage />
        </Route>
        <Route path="/search">
          <UsersSearchPage onSelect={setSelectedUser} />
        </Route>
        <Route path="/users" exact>
          <UsersPage onSelect={setSelectedUser} />
        </Route>
        <Route path="/" exact>
          <UsersPage onSelect={setSelectedUser} />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};
