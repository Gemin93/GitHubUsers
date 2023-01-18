import React, { FC } from 'react';
import { UsersSearch } from '../../types';
import { UsersList } from '../UsersList/UsersList';

export interface Prop {
  user: UsersSearch;
  select: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export const UsersPage: FC<Prop> = ({ user, select, onSelect }) => {
  return (
    <>
      <main>
        <div className="container">
          <UsersList user={user} select={select} onSelect={onSelect} />
        </div>
      </main>
    </>
  );
};
