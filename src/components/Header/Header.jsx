import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContexts';

import '../../scss/header.scss';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__list-first">
          <li className="nav__item">
            <Link to="/">Главная</Link>
          </li>
          <li className="nav__item">
            <Link to="/appointment">Запись</Link>
          </li>
        </ul>
        <ul className="nav__list-last">
          {isAuthenticated && (
            <>
              <li className="nav__item">
                <Link to={`/profile/${user.id}`}>{user.first_name}</Link>
              </li>
              <li className="nav__item">
                <button className="nav__item-btn" onClick={handleLogout}>
                  Выход
                </button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li className="nav__item">
              <Link to="/auth">Вход/Регистрация</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
