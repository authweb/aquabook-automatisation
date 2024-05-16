import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { ReactComponent as RegisterUser } from "../../assets/images/register.svg";
import { ReactComponent as LoginUser } from "../../assets/images/login.svg";
import { Input, NumberInput } from "../../components";

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
			const response = await axios.post("http//aqua-book:3306/api/register", {
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
			<div className='eb-auth-layout__header'>
				<div className='eb-auth-layout__logo'>
					<Link to='/'>
						<Logo />
					</Link>
				</div>
			</div>
			<div className='eb-auth-layout__container'>
				<form className='ab-card relative' onSubmit={submitHandler}>
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
						className='eb-button mt-2 w-full col-span-2 eb-button--custom-icon eb-button--color-accent'
						type='submit'
						style={{
							"--btn-bg": "var(--c-success-rgb)",
							"--btn-fg": "var(--c-on-accent-rgb)",
							"--btn-size": "3.5rem",
							"--btn-radius": "0.625rem",
							"--btn-icon-bg": "0.15",
						}}>
						<span className='eb-button__text'>Регистрация</span>
					</button>
				</form>
				<div className='ab-card mt-5'>
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
