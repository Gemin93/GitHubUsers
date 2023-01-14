import React, { FC, useEffect, useState } from 'react';
// import { Header } from '../Header/Header';
import { UsersList } from '../UsersList/UsersList';
import { UsersSearch } from '../../types';

export const UsersSearchPage: FC = () => {
  const [users, setUsers] = useState<UsersSearch>({
    items: [],
  });

  useEffect(() => {
    fetch('https://api.github.com/search/users?q=Gemin93', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
        // console.log(response.items);
      });
  }, []);
  console.log(users);

  return (
    <>
      {/*<Header />*/}
      <main>
        <div className="container">
          <h1 className="title">Пользователи по запросу defunkt</h1>
          <UsersList user={users} />
        </div>
      </main>
    </>
  );
};
