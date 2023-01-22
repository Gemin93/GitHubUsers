import React, { FC } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { GithubUser } from '../../types';
import { useLocation } from 'react-router-dom';

export interface Prop {
  users: GithubUser[];
  select: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export const UsersSearchPage: FC<Prop> = ({ users, select, onSelect }) => {
  return (
    <>
      <main>
        <div className="container">
          <h1 className="title">Пользователи по запросу defunkt</h1>
          <UsersList users={users} select={select} onSelect={onSelect} />
        </div>
      </main>
    </>
  );
};
