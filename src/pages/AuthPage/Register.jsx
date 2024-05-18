import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { ReactComponent as RegisterUser } from "../../assets/images/register.svg";
import { ReactComponent as LoginUser } from "../../assets/images/login.svg";
import { Header, Input, NumberInput } from "../../components";

const Register = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false); // состояние загрузки
	const [formState, setFormState] = useState({
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		password: "",
	});

	const submitHandler = async event => {
		event.preventDefault();
		setIsLoading(true); // Активировать индикатор загрузки

		try {
			const response = await axios.post(
				"https://api.aqua-book.ru/api/register",
				{
					first_name: formState.first_name,
					last_name: formState.last_name,
					phone: formState.phone,
					email: formState.email,
					password: formState.password,
				},
			);

			const responseData = response.data;
			if (response.status !== 200 && response.status !== 201) {
				throw new Error(responseData.message);
			}

			// Успешная регистрация
			navigate("/"); // Например, перенаправление на главную страницу
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
				buttonLoginRegister='Войти'
				titleLoginRegister='У вас есть аккаунт?'
				svg={<LoginUser />}
				to='/login'
			/>
			<div className='eb-auth-layout__container'>
				<form
					className='ab-card ab-card__logreg relative'
					onSubmit={submitHandler}>
					<h2 className='ab-title flex'>
						<RegisterUser className='ab-icon icon sprite-buttons mr-2 lg:mr-4 mt-1 flex-shrink-0 text-accent ab-icon--size-text' />
						Регистрация
					</h2>
					<div className='grid grid-cols-2 gap-4 items-start'>
						<Input
							colsSpan='col-span-2'
							type='email'
							name='email'
							required
							prefix='Email'
							value={formState.email}
							onChange={inputChangeHandler}
						/>
						<Input
							colsSpan='col-span-2'
							type='password'
							name='password'
							required
							prefix='Пароль'
							value={formState.password}
							onChange={inputChangeHandler}
						/>
						<Input
							type='text'
							name='first_name'
							required
							prefix='Имя'
							value={formState.first_name}
							onChange={inputChangeHandler}
						/>
						<Input
							type='text'
							name='last_name'
							prefix='Фамилия'
							value={formState.last_name}
							onChange={inputChangeHandler}
						/>
						<NumberInput
							colsSpan='col-span-2'
							type='tel'
							name='phone'
							required
							prefix='Телефон'
							value={formState.phone}
							onChange={inputChangeHandler}
						/>
					</div>
					<button
						className='ab-button mt-2 w-full ab-button--size-lg ab-button--theme-solid ab-button--color-accent ab-button--with-text ab-button--icon-highlighted ab-animated-icon-parent ab-button--color-accent'
						type='submit'>
						<span className='ab-button__icon-wrapper ab-button__icon-wrapper--left ab-button__icon-wrapper--placeholder'></span>
						<span className='ab-button__text'>Зарегистрироваться</span>
						<span className='ab-button__icon-wrapper ab-button__icon-wrapper--right ab-button__icon-wrapper--highlighted'>
							<svg
								aria-hidden='true'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
								className='ab-icon ab-icon--size-text ab-icon--animated'>
								<path
									d='M2.4 12c0-.66.54-1.2 1.2-1.2h15.6a1.2 1.2 0 0 1 0 2.4H3.6A1.2 1.2 0 0 1 2.4 12Z'
									class='svg-arrow-line'></path>
								<path
									fill-rule='evenodd'
									d='M14.12 4.84a1.2 1.2 0 1 0-1.55 1.85l6.3 5.28-6.3 5.3a1.2 1.2 0 1 0 1.54 1.82l7.36-6.16c.3-.24.45-.6.45-.96a1.2 1.2 0 0 0-.46-.95l-7.35-6.18Z'
									clip-rule='evenodd'
									class='svg-arrow-chevron'></path>
							</svg>
						</span>
					</button>
				</form>
				<div className='ab-card mt-2'>
					<h2 className='ab-title flex'>
						<LoginUser className='ab-icon icon sprite-buttons mr-2 lg:mr-4 mt-1 flex-shrink-0 text-accent ab-icon--size-text' />{" "}
						У вас уже есть аккаунт?
					</h2>
					<p>
						Вы можете{" "}
						<Link to='/login' className='link'>
							войти
						</Link>{" "}
						в личный кабинет.
					</p>
				</div>
			</div>
		</>
	);
};

export default Register;
