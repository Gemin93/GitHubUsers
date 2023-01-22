import React, { FC } from 'react';
import './UserProfilePage.css';
import { GithubUser, UserRepoDetails } from '../../types';
import { useParams } from 'react-router-dom';

export interface Props {
  details: GithubUser;
  reposDetails: UserRepoDetails[];
}

export const UserProfilePage: FC<Props> = ({ details, reposDetails }) => {
  const { id }: { id: string } = useParams();
  return (
    <>
      <main>
        <div className="container">
          <section className="user-profile">
            <div className="user-profile__image-container">
              {/*вместо id было details.login*/}
              <img className="user-profile__image" src={details.avatar_url} alt={`${id} profile photo`} />
            </div>
            <div className="user-profile__content">
              <h1 className="user-profile__title">
                {details.name}, <span className="user-profile__accent">{id}</span>
              </h1>
              <p className="user-profile__text">
                <span className="user-profile__accent">{details.followers}</span> followers ·{' '}
                <span className="user-profile__accent">{details.following}</span> following ·{' '}
                <a rel="noreferrer" href={`${details.blog}`} className="link" target="_blank">
                  {details.blog}
                </a>
              </p>
            </div>
          </section>

          <section className="repository-list">
            <div className="repository-list__header">
              <h2 className="repository-list__title">Репозитории</h2>
              <a rel="noreferrer" href={`https://github.com/${id}?tab=repositories`} className="link" target="_blank">
                Все репозитории
              </a>
            </div>

            <div className="repository-list__container">
              {Object.values(reposDetails)
                .slice(0, 5)
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
      </main>
    </>
  );
};
