import React, { FC } from 'react';
import './UsersList.css';
import { GithubUser } from '../../types';
import { Link } from 'react-router-dom';

export interface Prop {
  users: GithubUser[];
}

const reposFormat = (num: number, word: string) => {
  const rem = num % 10;
  let ending = '';
  if (num === 0) {
    word = 'РЕПОЗИТОРИЕВ НЕТ';
    return word;
  }
  if (num >= 11 && num <= 20) {
    word = 'РЕПОЗИТОРИЕВ';
    return word;
  }
  if (rem === 1) {
    ending = 'й';
  }
  if (rem >= 2 && rem <= 4) {
    ending = 'я';
  }
  if (rem >= 5 && rem <= 9) {
    ending = 'ев';
  }
  return word + ending;
};

console.log(reposFormat(0, 'репозитори'));
export const UsersList: FC<Prop> = ({ users }) => {
  return (
    <div className="users-list">
      {Object.values(users).map((values, index) => (
        <Link key={index} to={`/users/${values.login}`}>
          <section className="users-list__item">
            <div className="users-list__image-container">
              <img className="users-list__image" src={values.avatar_url} alt={`${values.login} profile photo`} />
            </div>
            <div className="users-list__content">
              <h2 className="users-list__title">
                <a href="/" className="link">
                  {values.login}
                </a>
                ,{' '}
                {values.public_repos === 0
                  ? reposFormat(values.public_repos, 'репозитори')
                  : values.public_repos + ' ' + reposFormat(values.public_repos, 'репозитори')}
              </h2>
              <p className="users-list__text">{values.company}</p>
            </div>
          </section>
        </Link>
      ))}
    </div>
  );
};
