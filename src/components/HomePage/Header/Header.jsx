import { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { initialState, reducer } from '../../../reducers/reduser';
import { useAuth } from '../../../contexts/AuthContexts';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import useDateHandler from '../../../hooks/useDateHandler';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { today, rangeStart, setToday, setRangeStart } = useDateHandler();
  const [stats, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const newDate = dayjs().format('YYYY-MM-DD');
    if (rangeStart !== newDate) {
      console.log('Setting dates:', newDate, rangeStart);
      dispatch({ type: 'SET_TODAY', payload: newDate });
      dispatch({ type: 'SET_RANGE_START', payload: newDate });
    }
  }, [dispatch, rangeStart]);
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="relative">
      <div className="p-4 md:py-6 md:px-16 flex items-center justify-center">
        <div className="flex items-center logo-pos flex-1">
          <Link
            to="/"
            className="font-comfort sm:text-xl whitespace-no-wrap relative align-middle py-4 pr-4">
            <Logo />
          </Link>
        </div>
        <nav className="hidden lg:flex flex-grow justify-center">
          <Link to="/" className="px-2 mx-2 md:mx-5 font-bold hover:text-l_green text-mid">
            Главная
          </Link>
          <Link to="/features" className="px-2 mx-2 md:mx-5 font-bold hover:text-l_green text-mid">
            Функции
          </Link>
        </nav>
        <div className="lg:flex-1 flex items-center justify-end">
          <div className="flex -mx-2 hidden lg-flex">
            {isAuthenticated && (
              <>
                <div className="px-2">
                  <Link
                    to={`/dashboard/calendar?today=${stats.today}&range_start=${stats.rangeStart}`}
                    className="btn-hp block w-full">
                    <span className="btn-hp__content btn-hp__content--btn rounded-10 border-2 flex items-center justify-center whitespace-no-wrap w-full py-4 px-6 btn-hp--link btn-hp--solid">
                      <span>Панель управления</span>
                    </span>
                  </Link>
                </div>
                <div className="px-2">
                  <Link className="btn-hp block w-full" onClick={handleLogout}>
                    <span className="btn-hp__content btn-hp__content--btn rounded-10 border-2 flex items-center justify-center whitespace-no-wrap w-full py-4 px-6 btn-hp--primary btn-hp--outline">
                      <span>Выход</span>
                    </span>
                  </Link>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <>
                <div className="px-2">
                  <Link to="/login" className="btn-hp block w-full">
                    <span className="btn-hp__content btn-hp__content--btn rounded-10 border-2 flex items-center justify-center whitespace-no-wrap w-full py-4 px-6 btn-hp--link btn-hp--solid">
                      <span>Вход</span>
                    </span>
                  </Link>
                </div>
                <div className="px-2">
                  <Link to="/register" className="btn-hp block w-full">
                    <span className="btn-hp__content btn-hp__content--btn rounded-10 border-2 flex items-center justify-center whitespace-no-wrap w-full py-4 px-6 btn-hp--primary btn-hp--outline">
                      <span>Регистрация</span>
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
