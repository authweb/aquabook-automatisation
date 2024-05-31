import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";
import { Input, HeaderUser, Header } from "../../components";
import "../../scss/header.scss";
import "../../scss/profile.scss";
import HeaderAddition from "../../components/Common/HeaderAddition";
import FixedButton from "../../components/Common/FormComponents/ProfileButton";

const LoginToProfile = () => {
	const navigate = useNavigate();
	const { signIn } = useAuth();
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			// Sign in the user with the email and password
			await signIn(email, password);
			// Redirect to the profile page after successful login
			navigate("/profile");
		} catch (errorMessage) {
			// Display an error message if sign in fails
			setError(errorMessage);
		}
	};

	const inputChangeHandler = event => {
		setFormState(prevState => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<page-disabled>
			<page-profile-page>
				<HeaderUser showBack title='AquaBook' />
				<HeaderAddition
					titleSection={"Личный кабинет"}
					className='header-addition'
				/>
				<div className='profile-content'>
					<page-substrate class='substrate cut-top full-width'>
						<div className='wrapper'>
							<form onSubmit={handleSubmit}>
								<Input
									labelClassName='bg-none'
									inputClassName='bg-none border-color'
									type='email'
									name='email'
									required
									prefix='Email'
									onChange={inputChangeHandler}
								/>
								<Input
									labelClassName='bg-none'
									inputClassName='bg-none border-color'
									type='password'
									name='password'
									required
									prefix='Пароль'
									onChange={inputChangeHandler}
								/>
								<FixedButton
									title='Войти'
									className='login-button'
									locator='login-btn'
								/>
								{error && <p style={{ color: "red" }}>{error}</p>}
							</form>
						</div>
					</page-substrate>

					<FixedButton
						title='Новая запись'
						className='fixed-button'
						to='/booking'
					/>
				</div>
			</page-profile-page>
		</page-disabled>
	);
};

export default LoginToProfile;
