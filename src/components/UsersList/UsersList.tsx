import React, { FC } from 'react';
import './UsersList.css';
import { GithubUser } from '../../types';
import { Link } from 'react-router-dom';

export interface Prop {
  users: GithubUser[];
}

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
                , {values.public_repos} репозиториев
              </h2>
              <p className="users-list__text">{values.company}</p>
            </div>
          </section>
        </Link>
      ))}
    </div>
  );
};
