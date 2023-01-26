import React from 'react';
import './SkeletonUsersList.css';

export const SkeletonUsersList = () => {
  return (
    <div className="skeleton-blog">
      <div className="skeleton-avatar"></div>
      <div>
        <div className="skeleton-name"></div>
        <div className="skeleton-company"></div>
      </div>
    </div>
  );
};
