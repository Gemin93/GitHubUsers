import React from 'react';
import './SkeletonProfilePage.css';

export const SkeletonProfilePage = () => {
  return (
    <>
      <div className="skeleton">
        <div className="skeleton-user">
          <div className="skeleton-profile">
            <div className="skeleton-profile-avatar"></div>
            <div>
              <div className="skeleton-profile-name"></div>
              <div className="skeleton-profile-company"></div>
            </div>
          </div>
        </div>

        <section>
          <div className="skeleton-repository__header">
            <h2 className="repository-list__title">Репозитории</h2>
            <a rel="noreferrer" className="link" target="_blank">
              Все репозитории
            </a>
          </div>

          <div className="skeleton-repository__container">
            {[...new Array(6)].map((_, index) => (
              <section className="skeleton-repository__item" key={index}></section>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
