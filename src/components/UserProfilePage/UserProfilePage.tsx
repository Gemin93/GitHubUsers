import React, { FC, useEffect, useState } from 'react';
import './UserProfilePage.css';
import { SkeletonProfilePage } from '../SkeletonProfilePage/SkeletonProfilePage';
import { GithubUser, UserRepoDetails } from '../../types';
import { useParams } from 'react-router-dom';

// склонение подписчиков
const followersFormat = (num: number, word: string) => {
  const rem = num % 10;
  let ending = '';
  if (num === 0) {
    word = 'ПОДПИСЧИКОВ НЕТ';
    return word;
  }
  if (num >= 11 && num <= 20) {
    word = 'ПОДПИСЧИКОВ';
    return word;
  }
  if (rem === 1) {
    ending = '';
  }
  if (rem >= 2 && rem <= 4) {
    ending = 'А';
  }
  if ((rem >= 5 && rem <= 9) || rem === 0) {
    ending = 'ОВ';
  }
  return word + ending;
};
// склонение подписок
const followingFormat = (num: number, word: string) => {
  const rem = num % 10;
  let ending = '';
  if (num === 0) {
    word = 'ПОДПИСОК НЕТ';
    return word;
  }
  if (num >= 11 && num <= 20) {
    word = 'ПОДПИСОК';
    return word;
  }
  if (rem === 1) {
    ending = 'КА';
  }
  if (rem >= 2 && rem <= 4) {
    ending = 'КИ';
  }
  if ((rem >= 5 && rem <= 9) || rem === 0) {
    ending = 'ОК';
  }
  return word + ending;
};

export const UserProfilePage: FC = () => {
  const { id }: { id: string } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [usersDetails, setUsersDetails] = useState<GithubUser>({
    id: 0,
    login: '',
    name: '',
    avatar_url: '',
    followers: 0,
    public_repos: 0,
    company: '',
    following: 0,
    blog: '',
    url: '',
  });
  const [userRepos, setUserRepos] = useState<UserRepoDetails[]>([]);

  // загрузка инфрмации о конкретном пользователе
  useEffect(() => {
    if (id) {
      // запрос общей информации
      fetch(`https://api.github.com/users/${id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response: GithubUser) => {
          setUsersDetails(response);
        });

      // запрос информации о репозитории
      fetch(`https://api.github.com/users/${id}/repos`, {
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response: UserRepoDetails[]) => {
          setUserRepos(response);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  return (
    <>
      <main>
        <div className="container">
          {isLoading ? (
            <SkeletonProfilePage />
          ) : (
            <div>
              <section className="user-profile">
                <div className="user-profile__image-container">
                  <img className="user-profile__image" src={usersDetails.avatar_url} alt={`${id} profile photo`} />
                </div>
                <div className="user-profile__content">
                  <h1 className="user-profile__title">
                    {usersDetails.name}, <span className="user-profile__accent">{id}</span>
                  </h1>
                  <p className="user-profile__text">
                    <span className="user-profile__accent">
                      {usersDetails.followers === 0
                        ? followersFormat(0, '')
                        : usersDetails.followers + ' ' + followersFormat(usersDetails.followers, 'ПОДПИСЧИК')}
                    </span>{' '}
                    ·{' '}
                    <span className="user-profile__accent">
                      {usersDetails.following === 0
                        ? followingFormat(0, '')
                        : usersDetails.following + ' ' + followingFormat(usersDetails.following, 'ПОДПИС')}
                    </span>{' '}
                    ·{' '}
                    <a rel="noreferrer" href={`${usersDetails.blog}`} className="link" target="_blank">
                      {usersDetails.blog}
                    </a>
                  </p>
                </div>
              </section>

              <section className="repository-list">
                <div className="repository-list__header">
                  <h2 className="repository-list__title">Репозитории</h2>
                  <a
                    rel="noreferrer"
                    href={`https://github.com/${id}?tab=repositories`}
                    className="link"
                    target="_blank"
                  >
                    Все репозитории
                  </a>
                </div>

                <div className="repository-list__container">
                  {Object.values(userRepos)
                    .slice(0, 6)
                    .map((value, index) => (
                      <section className="repository-list__item" key={index}>
                        <h3 className="repository-list__item-title">
                          <a rel="noreferrer" href={`${value.html_url}`} className="link" target="_blank">
                            {value.name}
                          </a>
                        </h3>
                        <p className="repository-list__item-text">{value.description}</p>
                      </section>
                    ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
