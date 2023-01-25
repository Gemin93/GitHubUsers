import React, { FC, useEffect, useState } from 'react';
import { API_KEY, GithubUser } from '../../types';
import { UsersList } from '../UsersList/UsersList';
import { useLocation } from 'react-router-dom';

export const UsersPage: FC = () => {
  const location = useLocation();

  // загрузка  пользователей
  const [userFull, setUserFull] = useState<GithubUser[]>([]);
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/users') {
      fetch('https://api.github.com/users', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      })
        .then((response) => response.json())
        .then((response: GithubUser) => {
          // собираю логины полученных пользователей
          const arrLogin: string[] = Object.values(response).map((value) => {
            return value.login;
          });
          //массив запросов для каждого пользователя для уточнения
          const arrFetchUsers = arrLogin.map((login) =>
            fetch(`https://api.github.com/users/${login}`, {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`,
              },
            }).then((response) => response.json())
          );

          Promise.all(arrFetchUsers).then((responses) => {
            const userInfo: GithubUser[] = responses;
            setUserFull(userInfo);
          });
        });
    }

    console.log('sync users');
  }, []);
  return (
    <>
      <main>
        <div className="container">
          <UsersList users={userFull} />
        </div>
      </main>
    </>
  );
};
