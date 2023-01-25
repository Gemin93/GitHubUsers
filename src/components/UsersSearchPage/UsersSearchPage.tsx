import React, { FC, useEffect, useState } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { API_KEY, GithubUser } from '../../types';
import { useLocation } from 'react-router-dom';

export interface Prop {
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export const UsersSearchPage: FC<Prop> = ({ onSelect }) => {
  const [userFull, setUserFull] = useState<GithubUser[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  console.log(query);

  // загрузка пользователей для страницы поиска
  useEffect(() => {
    query !== '' &&
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          // собираю логины полученных пользователей
          const arrLogin: string[] = response.items.map((value: { login: string }) => {
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
    console.log('sync search');
  }, [query]);

  return (
    <>
      {userFull.length ? (
        <main>
          <div className="container">
            <h1 className="title">ПОЛЬЗОВАТЕЛИ ПО ЗАПРОСУ {query}</h1>
            <UsersList users={userFull} onSelect={onSelect} />
          </div>
        </main>
      ) : (
        <main>
          <div className="container">
            <h1 className="title">НИЧЕГО НЕ НАЙДЕНО ПО ЗАПРОСУ {query}</h1>
          </div>
        </main>
      )}
    </>
  );
};
