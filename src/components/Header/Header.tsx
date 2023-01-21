import React, { FC, FormEvent } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Header: FC<Props> = ({ search, setSearch, onClick }) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!search.trim().length) {
      return;
    }
  };

  return (
    <header className="header">
      <div className="container header__container">
        <nav className="header__navigation">
          <ul className="header__navigation-list">
            <li className="header__navigation-list-item">
              <Link to={'/users'} className="header__navigation-link">
                Пользователи гитхаба
              </Link>
            </li>
            <li className="header__navigation-list-item">
              <a className="header__navigation-link header__navigation-link--user">{search}</a>
            </li>
          </ul>
        </nav>

        <div className="header__search">
          <form className="header__search-form" onSubmit={onSubmit}>
            <input
              type="search"
              className="header__search-input"
              placeholder="Поиск пользователя"
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
            />
            <Link to={`/search?query=${search}`}>
              <button type="submit" className="header__search-button" onClick={onClick}>
                Найти
              </button>
            </Link>
          </form>
        </div>
      </div>
    </header>
  );
};
