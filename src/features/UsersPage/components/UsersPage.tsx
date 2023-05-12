import React, { FC, useEffect, useState } from 'react';
import { API_KEY, GithubUser } from '../../../types';
import { UsersList } from '../../../components/UsersList/UsersList';
import { useLocation } from 'react-router-dom';

const randomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

//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
//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

const authToken = process.env.API_KEY;

export const UsersPage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // загрузка  пользователей
  const [userFull, setUserFull] = useState<GithubUser[]>([]);
  useEffect(() => {
    setIsLoading(true);
    if (location.pathname === '/' || location.pathname === '/users') {
      fetch(`https://api.github.com/users?since=${randomInteger(1, 1000000)}`, {
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

          Promise.all(arrFetchUsers)
            .then((responses) => {
              const userInfo: GithubUser[] = responses;
              setUserFull(userInfo);
            })
            .finally(() => {
              setIsLoading(false);
            });
        });
    }
  }, []);
  return (
    <>
      <main>
        <div className="container">
          <UsersList users={userFull} isLoading={isLoading} />
        </div>
      </main>
    </>
  );
};
