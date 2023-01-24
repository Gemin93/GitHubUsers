import React, { FC } from 'react';
import { GithubUser } from '../../types';
import { UsersList } from '../UsersList/UsersList';

export interface Prop {
  users: GithubUser[];
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export const UsersPage: FC<Prop> = ({ users, onSelect }) => {
  return (
    <>
      <main>
        <div className="container">
          <UsersList users={users} onSelect={onSelect} />
        </div>
      </main>
    </>
  );
};
