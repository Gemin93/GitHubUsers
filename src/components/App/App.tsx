import React, { FC } from 'react';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { Header } from '../Header/Header';
import { Route, Switch } from 'react-router-dom';

export const App: FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/users/:id">
          <UserProfilePage />
        </Route>
        <Route path="/">
          <UsersSearchPage />
        </Route>
        {/*Настроить редирект на / */}
        <Route path="*">
          <UsersPage />
        </Route>
      </Switch>
    </>
  );
};
