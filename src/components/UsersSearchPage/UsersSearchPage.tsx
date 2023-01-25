import React, { FC } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { GithubUser } from '../../types';

export interface Prop {
  users: GithubUser[];
  searchValue: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export const UsersSearchPage: FC<Prop> = ({ users, searchValue, onSelect }) => {
  console.log(users);
  return (
    <>
      {users.length ? (
        <main>
          <div className="container">
            <h1 className="title">ПОЛЬЗОВАТЕЛИ ПО ЗАПРОСУ {searchValue}</h1>
            <UsersList users={users} onSelect={onSelect} />
          </div>
        </main>
      ) : (
        <main>
          <div className="container">
            <h1 className="title">НИЧЕГО НЕ НАЙДЕНО ПО ЗАПРОСУ {searchValue}</h1>
          </div>
        </main>
      )}
    </>
  );
};
