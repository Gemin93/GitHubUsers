import React, { FC } from 'react';
import './UsersList.css';
import { GithubUser } from '../../types';
import { Link } from 'react-router-dom';

export interface Prop {
  users: GithubUser[];
  select: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export const UsersList: FC<Prop> = ({ users, select, onSelect }) => {
  return (
    <div className="users-list">
      {Object.values(users)
        .slice(0, 9)
        .map((values, index) => (
          <Link key={index} to={`/users/${values.login}`}>
            <section
              className="users-list__item"
              onClick={() => {
                onSelect(values.login);
              }}
            >
              <div className="users-list__image-container">
                <img className="users-list__image" src={values.avatar_url} alt="defunkt profile photo" />
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
