import React, { FC } from 'react';
import { UserProfilePage } from '../../../features/UserProfilePage/components/UserProfilePage';
import { UsersPage } from '../../../features/UsersPage/components/UsersPage';
import { UsersSearchPage } from '../../../features/UsersSearchPage/components/UsersSearchPage';
import { Header } from '../../../components/Header/Header';
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
