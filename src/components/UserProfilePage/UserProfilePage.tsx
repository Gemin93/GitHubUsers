import React, { FC } from 'react';
import './UserProfilePage.css';
import { UsersDetails } from '../../types';

export interface Props {
  details: UsersDetails;
}

export const UserProfilePage: FC<Props> = ({ details }) => {
  return (
    <>
      <main>
        <div className="container">
          <section className="user-profile">
            <div className="user-profile__image-container">
              <img className="user-profile__image" src={details.avatar_url} alt={`${details.login} profile photo`} />
            </div>
            <div className="user-profile__content">
              <h1 className="user-profile__title">
                {details.name}, <span className="user-profile__accent">{details.login}</span>
              </h1>
              <p className="user-profile__text">
                <span className="user-profile__accent">{details.followers}</span> followers ·{' '}
                <span className="user-profile__accent">{details.following}</span> following ·{' '}
                <a href="http://chriswanstrath.com/" className="link">
                  {details.blog}
                </a>
              </p>
            </div>
          </section>

          <section className="repository-list">
            <div className="repository-list__header">
              <h2 className="repository-list__title">Репозитории</h2>
              <a
                rel="noreferrer"
                href={`https://github.com/${details.login}?tab=repositories`}
                className="link"
                target="_blank"
              >
                Все репозитории
              </a>
            </div>

            <div className="repository-list__container">
              {[1, 2, 3, 4, 5].map((item) => (
                <section className="repository-list__item" key={item}>
                  <h3 className="repository-list__item-title">
                    <a href="/" className="link">
                      body_matcher
                    </a>
                  </h3>
                  <p className="repository-list__item-text">Simplify your view testing. Forget assert_select.</p>
                </section>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
