import React, { FC, FormEvent, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export interface Props {
  value: string;
  onSearch: (fixedValue: string) => void;
}

export const Header: FC<Props> = ({ value, onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>(value);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchValue.trim().length) {
      return;
    }
  };

  return (
    <header className="header">
      <div className="container header__container">
        <nav className="header__navigation">
          <ul className="header__navigation-list">
            <Link to={'/'}>
              <li
                className="header__navigation-list-item"
                onClick={() => {
                  onSearch('');
                }}
              >
                <span className="header__navigation-link">Пользователи гитхаба</span>
              </li>
            </Link>
            <li className="header__navigation-list-item">
              <a className="header__navigation-link header__navigation-link--user">{searchValue}</a>
            </li>
          </ul>
        </nav>

        <div className="header__search">
          <form className="header__search-form" onSubmit={onSubmit}>
            <input
              type="search"
              className="header__search-input"
              placeholder="Поиск пользователя"
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
            <Link to={`/search?query=${searchValue}`}>
              <button
                type="submit"
                className="header__search-button"
                onClick={() => {
                  onSearch(searchValue);
                }}
              >
                Найти
              </button>
            </Link>
          </form>
        </div>
      </div>
    </header>
  );
};
