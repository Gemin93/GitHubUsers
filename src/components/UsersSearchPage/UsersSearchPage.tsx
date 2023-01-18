import React, { FC } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { UsersSearch } from '../../types';

export interface Prop {
  user: UsersSearch;
  select: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export const UsersSearchPage: FC<Prop> = ({ user, select, onSelect }) => {
  return (
    <>
      <main>
        <div className="container">
          <h1 className="title">Пользователи по запросу defunkt</h1>
          <UsersList user={user} select={select} onSelect={onSelect} />
        </div>
      </main>
    </>
  );
};
