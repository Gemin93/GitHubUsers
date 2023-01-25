import React, { FC, FormEvent, useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export interface Props {
  value: string;
  selectUser: string;
  onSearch: (fixedValue: string) => void;
  onSelect: (fixedValue: string) => void;
}

export const Header: FC<Props> = ({ value, selectUser, onSearch, onSelect }) => {
  const [searchValue, setSearchValue] = useState<string>(value);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchValue.trim().length) {
      return;
    }
  };

  // сброс строки поиска, когда нажимаем на кнопку пользователи гитхаба
  useEffect(() => {
    setSearchValue(value);
  }, [value]);

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
                  onSelect('');
                }}
              >
                <span className="header__navigation-link">Пользователи гитхаба</span>
              </li>
            </Link>
            <li className="header__navigation-list-item">
              <a className="header__navigation-link header__navigation-link--user">{value ? 'Поиск' : selectUser}</a>
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
                  //хотелось бы здесь вывести подсказку что если строка пустая - то кнопка не нажмётся
                  //оставлю как тех долг :)
                  searchValue == '' ? event.preventDefault() : onSearch(searchValue);
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
