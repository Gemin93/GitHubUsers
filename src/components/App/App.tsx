import React, { FC } from 'react';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { Header } from '../Header/Header';
import { Route, Switch, Redirect } from 'react-router-dom';

export const App: FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/users/:id" exact>
          <UserProfilePage />
        </Route>
        <Route path="/search">
          <UsersSearchPage />
        </Route>
        <Route path="/users" exact>
          <UsersPage />
        </Route>
        <Route path="/" exact>
          <UsersPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};
