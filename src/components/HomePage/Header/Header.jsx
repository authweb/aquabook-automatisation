import react, { useState, useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { initialState, reducer } from "../../../reducers/reduser";
import { useAuth } from "../../../contexts/AuthContexts";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import useDateHandler from "../../../hooks/useDateHandler";

import "../../../scss/header.scss";

const Header = ({
	desktopItems,
	buttonLoginRegister,
	titleLoginRegister,
	to,
	svg,
}) => {
	const { user, isAuthenticated, logout } = useAuth();
	const { today, rangeStart, setToday, setRangeStart } = useDateHandler();
	const [stats, dispatch] = useReducer(reducer, initialState);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
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
				{desktopItems && (
					<div className='the-header__desktop-items'>
						<Link to='/' className='the-header__desktop-item'>
							Главная
						</Link>
						<Link to='/features' className='the-header__desktop-item'>
							Функции
						</Link>
					</div>
				)}

				<div className='the-header__navbar-side the-header__navbar-side--right'>
					<div className='the-header__navbar-buttons'>
						<div className='flex gap-5 items-center'>
							{buttonLoginRegister ? (
								<>
									<Link
										to={to}
										className='the-header__root-link w-full sm:w-auto base-button base-button--inverted base-button--xs base-button--bg'>
										<span className='base-button__text base-button__text--center'>
											{svg}
											{buttonLoginRegister}
										</span>
									</Link>
									<span className='base-button__text'>
										{titleLoginRegister}
									</span>
								</>
							) : isAuthenticated ? (
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
							) : (
								!isAuthenticated && (
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
								)
							)}
						</div>
					</div>
					<button
						className={`the-burger-button ml-6 ${
							isMenuOpen ? "the-header__menu--opened" : ""
						}`}
						aria-label='Переключить меню'
						onClick={toggleMenu}>
						<svg width='24' height='24' viewBox='0 0 100 100'>
							<path
								className='the-burger-button__line the-burger-button__line-1'
								d='M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058'></path>
							<path
								className='the-burger-button__line the-burger-button__line-2'
								d='M 20,50 H 80'></path>
							<path
								className='the-burger-button__line the-burger-button__line-3'
								d='M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942'></path>
						</svg>
					</button>
				</div>
			</div>
			<nav
				className={`the-header__menu ${
					isMenuOpen ? "the-header__menu--opened" : ""
				}`}>
				{buttonLoginRegister ? (
					<>
						<span className='base-button base-button--bg'>
							{titleLoginRegister}
						</span>
						<Link
							to={to}
							className='base-button base-button--primary base-button--md base-button--bg'>
							<span className='base-button__text base-button__text--center'>
								{svg}
								{buttonLoginRegister}
							</span>
						</Link>
					</>
				) : isAuthenticated ? (
					<>
						<Link
							to={`/dashboard/calendar?today=${stats.today}&range_start=${stats.rangeStart}`}
							className='mt-5 base-button base-button--primary base-button--md base-button--bg'>
							<span className='base-button__text base-button__text--center'>
								Панель управления
							</span>
						</Link>
						<Link
							className='base-button base-button--outline-secondary base-button--md base-button--bg base-button--outline'
							onClick={handleLogout}>
							<span className='base-button__text base-button__text--center'>
								Выход{" "}
							</span>
						</Link>
					</>
				) : (
					!isAuthenticated && (
						<>
							<Link
								to='/register'
								className='mt-5 base-button base-button--primary base-button--md base-button--bg'>
								<span className='base-button__text base-button__text--center'>
									Регистрация
								</span>
							</Link>
							<Link
								to='/login'
								className='base-button base-button--outline-secondary base-button--md base-button--bg base-button--outline'>
								<span className='base-button__text base-button__text--center'>
									Вход{" "}
								</span>
							</Link>
						</>
					)
				)}
				{desktopItems && (
					<div className='lg:block grid gap-4 mb-4 lg:mb-0'>
						<div className='lg:mb-0 mb-3'>
							<Link to='/' className='the-header__mobile-item'>
								Главная
							</Link>
						</div>
						<div className='lg:mb-0 mb-3'>
							<Link to='/features' className='the-header__mobile-item'>
								Функции
							</Link>
						</div>
					</div>
				)}
			</nav>
		</header>
	);
};

export default Header;
