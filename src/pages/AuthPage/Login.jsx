import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContexts";
import { Header, Input } from "../../components";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { ReactComponent as Register } from "../../assets/images/register.svg";
import { ReactComponent as LoginUser } from "../../assets/images/login.svg";

import "../../scss/logreg.scss";

const Login = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false); // состояние загрузки
	const { login } = useContext(AuthContext);
	const [formState, setFormState] = useState({ email: "", password: "" });

	const submitHandler = async event => {
		event.preventDefault();
		setIsLoading(true); // Активировать индикатор загрузки

		try {
			const response = await axios.post("https://api.aqua-book.ru/api/login", {
				email: formState.email,
				password: formState.password,
			});

			const responseData = response.data;
			if (response.status !== 200 && response.status !== 201) {
				throw new Error(responseData.message);
			}

			// Успешный вход
			const { token, id, first_name, last_name, phone, email } =
				responseData.user;
			login({ token, id, first_name, last_name, phone, email });
			navigate(`/dashboard/profile/${id}`);
		} catch (error) {
			console.error(error);
			setIsLoading(false); // Отключить индикатор загрузки при ошибке
		}
	};

	const inputChangeHandler = event => {
		setFormState(prevState => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<>
			<Header
				buttonLoginRegister='Регистрация'
				titleLoginRegister='У вас нет аккаунта?'
				svg={<Register />}
				to='/register'
			/>
			<div className='eb-auth-layout__container'>
				<form className='ab-card relative' onSubmit={submitHandler}>
					<h2 className='ab-title flex'>
						<LoginUser className='ab-icon icon sprite-buttons mr-2 lg:mr-4 mt-1 flex-shrink-0 text-accent ab-icon--size-text' />
						Вход
					</h2>
					<div className='grid grid-cols-1 gap-4 items-start'>
						{/* <div className="flex items-center border p-4" style={{ borderRadius: '10px' }}></div> */}
						<Input
							type='email'
							name='email'
							required
							prefix='Email'
							onChange={inputChangeHandler}
						/>
						<Input
							type='password'
							name='password'
							required
							prefix='Пароль'
							onChange={inputChangeHandler}
						/>
					</div>
					<button
						className='eb-button mt-2 w-full eb-button--custom-icon eb-button--color-accent'
						style={{
							"--btn-bg": "var(--button-e-color)",
							"--btn-fg": "var(--white-color)",
							"--btn-size": "3.5rem",
							"--btn-radius": "0.625rem",
							"--btn-icon-bg": "0.15",
						}}
						type='submit'>
						<span className='eb-button__text'>Войти в систему</span>
					</button>
				</form>
			</div>
		</>
	);
};

export default Login;
