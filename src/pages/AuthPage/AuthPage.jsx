import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';
import Spinner from '../../assets/images/Spinner-2.gif';
import { AuthContext } from '../../contexts/AuthContexts';
import '../../scss/authemployee.scss';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // получаем login из контекста AuthContext

  const [isLoginMode, setIsLoginMode] = useState(true); // по умолчанию отображается форма входа
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки
  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
  }); // состояние формы

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        const data = await response.json();
        console.log('data:', data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  //   const handleLogin = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const { data } = await axios.post(
  //         '/api/login',
  //         {
  //           email: formState.email,
  //           password: formState.password,
  //         },
  //         {
  //           headers: { 'Content-Type': 'application/json' },
  //         },
  //       );
  //       const { token, id, first_name, last_name } = data;
  //       login({ token, id, first_name, last_name });
  //       navigate('/profile');
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const url = isLoginMode ? '/api/login' : '/api/register';
      const response = await axios.post(url, {
        first_name: formState.first_name,
        last_name: formState.last_name,
        phone: formState.phone,
        email: formState.email,
        password: formState.password,
      });

      const responseData = response.data;

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(responseData.message);
      }

      if (isLoginMode) {
        const { token, id, first_name, last_name, phone, email } = responseData.user;
        login({ token, id, first_name, last_name, phone, email });
        navigate(`/profile/${id}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="auth-page">
      <Header />

      <h2>{isLoginMode ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={submitHandler}>
        {!isLoginMode && (
          <>
            <div>
              <label htmlFor="first_name">Имя:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formState.first_name}
                onChange={inputChangeHandler}
              />
            </div>
            <div>
              <label htmlFor="last_name">Фамилия:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formState.last_name}
                onChange={inputChangeHandler}
              />
            </div>
            <div>
              <label htmlFor="phone">Телефон:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={inputChangeHandler}
              />
            </div>
          </>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="auth-actions">
          <button className="btn-form" type="submit">
            {isLoginMode ? 'Вход' : 'Регистрация'}
          </button>
          <button className="btn-form" type="button" onClick={switchModeHandler}>
            {isLoginMode ? 'Перейти к регистрации' : 'Перейти к входу'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
