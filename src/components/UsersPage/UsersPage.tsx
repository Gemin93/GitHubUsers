import React, { FC } from 'react';
import { GithubUser } from '../../types';
import { UsersList } from '../UsersList/UsersList';

export interface Prop {
  users: GithubUser[];
  select: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export const UsersPage: FC<Prop> = ({ users, select, onSelect }) => {
  console.log(select);
  return (
    <>
      <main>
        <div className="container">
          <UsersList users={users} select={select} onSelect={onSelect} />
        </div>
      </main>
    </>
  );
};
