import React, { FC } from 'react';
import './UsersList.css';
import { UsersSearch } from '../../types';

interface Prop {
  user: UsersSearch;
}

export const UsersList: FC<Prop> = ({ user }) => {
  return (
    <div className="users-list">
      {user.items.map((item) => (
        <section className="users-list__item" key={item.id}>
          <div className="users-list__image-container">
            <img className="users-list__image" src={item.avatar} alt="defunkt profile photo" />
          </div>
          <div className="users-list__content">
            <h2 className="users-list__title">
              <a href="/" className="link">
                {item.login}
              </a>
              , 15 репозиториев
            </h2>
            <p className="users-list__text">Название организации</p>
          </div>
        </section>
      ))}
    </div>
  );
};

// export const UsersList: FC<Prop> = ({users}) => {
//   return (
//     <div className="users-list">
//       {users.map((item) => (
//         <section className="users-list__item" key={item}>
//           <div className="users-list__image-container">
//             <img className="users-list__image" src="http://placeimg.com/640/480/any" alt="defunkt profile photo" />
//           </div>
//           <div className="users-list__content">
//             <h2 className="users-list__title">
//               <a href="/" className="link">
//                 defunkt
//               </a>
//               , 15 репозиториев
//             </h2>
//             <p className="users-list__text">Название организации</p>
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };
