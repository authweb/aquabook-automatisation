import { Link, useNavigate } from 'react-router-dom';
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
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">Главная</Link>
          </li>
          <li className="nav__item">
            <Link to="/appointment">Запись</Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav__item">
                <Link to={`/profile/${user.id}`}>{user.first_name}</Link>
              </li>
              <li className="nav__item">
                <button onClick={handleLogout}>Выход</button>
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
