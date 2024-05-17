import { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { initialState, reducer } from "../../../reducers/reduser";
import { useAuth } from "../../../contexts/AuthContexts";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import useDateHandler from "../../../hooks/useDateHandler";

import "../../../scss/header.scss";

const Header = () => {
	const { user, isAuthenticated, logout } = useAuth();
	const { today, rangeStart, setToday, setRangeStart } = useDateHandler();
	const [stats, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const newDate = dayjs().format("YYYY-MM-DD");
		if (rangeStart !== newDate) {
			console.log("Setting dates:", newDate, rangeStart);
			dispatch({ type: "SET_TODAY", payload: newDate });
			dispatch({ type: "SET_RANGE_START", payload: newDate });
		}
	}, [dispatch, rangeStart]);
	const handleLogout = () => {
		logout();
	};
	return (
		<header className='the-header--sticky the-header'>
			<div className='the-header__navbar the-header__navbar--black'>
				<div className='the-header__navbar-side the-header__navbar-side--left sm:w-auto w-12'>
					<Link
						to='/'
						className='router-link-active router-link-exact-active the-header__root-link'>
						<Logo className='the-header__logo' />
					</Link>
				</div>
				<div className='the-header__desktop-items'>
					<Link to='/' className='the-header__desktop-item'>
						Главная
					</Link>
					<Link to='/features' className='the-header__desktop-item'>
						Функции
					</Link>
				</div>
				<div className='the-header__navbar-side the-header__navbar-side--right'>
					<div className='the-header__navbar-buttons'>
						<div className='flex gap-5 items-center'>
							{isAuthenticated && (
								<>
									<Link
										to={`/dashboard/calendar?today=${stats.today}&range_start=${stats.rangeStart}`}
										className='the-header__root-link w-full sm:w-auto base-button base-button--inverted base-button--xs base-button--bg'>
										<span className='base-button__text base-button__text--center'>
											Панель управления
										</span>
									</Link>
									<Link
										className='the-header__root-link mx-auto sm:mx-0 base-button base-button--text-inverted base-button--xs'
										onClick={handleLogout}>
										<span className='base-button__text'>Выход </span>
									</Link>
								</>
							)}
							{!isAuthenticated && (
								<>
									<Link
										to='/register'
										className='the-header__root-link w-full sm:w-auto base-button base-button--inverted base-button--xs base-button--bg'>
										<span className='base-button__text base-button__text--center'>
											Регистрация
										</span>
									</Link>
									<Link
										to='/login'
										className='the-header__root-link mx-auto sm:mx-0 base-button base-button--text-inverted base-button--xs'>
										<span className='base-button__text'>Вход </span>
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
