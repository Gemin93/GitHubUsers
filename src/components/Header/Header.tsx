import React, { FC, FormEvent, useState } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';

export const Header: FC = () => {
  const location = useLocation();
  const arrPathname = location.pathname.split('/');
  const [searchValue, setSearchValue] = useState<string>('');
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
                  setSearchValue('');
                }}
              >
                <span className="header__navigation-link">Пользователи гитхаба</span>
              </li>
            </Link>
            <li className="header__navigation-list-item">
              <a className="header__navigation-link header__navigation-link--user">
                {location.pathname === '/search' ? 'Поиск' : arrPathname[2]}
              </a>
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
                onClick={(event) => {
                  // вот здесь хорошо бы добавить всплывающую подсказку
                  // но я этого не сделал =)
                  // блокирую кнопку если строка поиска пустая
                  searchValue === '' && event.preventDefault();
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
