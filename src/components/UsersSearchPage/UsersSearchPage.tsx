import React, { FC } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { GithubUser } from '../../types';

export interface Prop {
  users: GithubUser[];
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export const UsersSearchPage: FC<Prop> = ({ users, onSelect }) => {
  return (
    <>
      <main>
        <div className="container">
          <h1 className="title">Пользователи по запросу defunkt</h1>
          <UsersList users={users} onSelect={onSelect} />
        </div>
      </main>
    </>
  );
};
