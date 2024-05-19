import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";

import {
	UserOutlined,
	SettingOutlined,
	TeamOutlined,
	IdcardOutlined,
	BarsOutlined,
	PoweroffOutlined,
	CalendarOutlined,
	PieChartOutlined,
} from "@ant-design/icons";

const MobileNavigation = ({ stats }) => {
	const { users, logout } = useAuth();

	const handleLogout = () => {
		logout();
	};
	return (
		<>
			<div className='ab-bottom-bar ab-page__ab-bottom-bar eb-calendar-page__bottom-bar'>
				<Link
					to={`/dashboard/profile/${users.id}`}
					className='ab-icon-menu-item focus-outline nuxt-link-active ab-icon-menu-item--clip ab-icon-menu-item--active'>
					<IdcardOutlined
						style={{ fontSize: "24px" }}
						className='ab-icon-menu-item__icon-block ab-icon-menu-item__icon-block--clip'
					/>
					<span className='ab-icon-menu-item__text ab-icon-menu-item__text--highlight'>
						Профиль
					</span>
				</Link>
				<Link
					to={`/dashboard/calendar?today=${stats.today}&range_start=${stats.rangeStart}`}
					className='ab-icon-menu-item focus-outline nuxt-link-active ab-icon-menu-item--clip ab-icon-menu-item--active'>
					<CalendarOutlined
						style={{ fontSize: "24px" }}
						className='ab-icon-menu-item__icon-block ab-icon-menu-item__icon-block--clip'
					/>
					<span className='ab-icon-menu-item__text ab-icon-menu-item__text--highlight'>
						Календарь
					</span>
				</Link>
				<Link
					to='clients'
					className='ab-icon-menu-item focus-outline ab-icon-menu-item--clip'>
					<TeamOutlined
						style={{ fontSize: "24px" }}
						className='ab-icon-menu-item__icon-block ab-icon-menu-item__icon-block--clip'
					/>
					<span className='ab-icon-menu-item__text ab-icon-menu-item__text--highlight'>
						Клиенты
					</span>
				</Link>
				<Link
					to='analytics'
					className='ab-icon-menu-item focus-outline ab-icon-menu-item--clip'>
					<PieChartOutlined
						style={{ fontSize: "24px" }}
						className='ab-icon-menu-item__icon-block ab-icon-menu-item__icon-block--clip'
					/>
					<span className='ab-icon-menu-item__text ab-icon-menu-item__text--highlight'>
						Аналитика
					</span>
				</Link>
				<Link
					to='settings'
					className='ab-icon-menu-item focus-outline ab-icon-menu-item--clip'>
					<SettingOutlined
						style={{ fontSize: "24px" }}
						className='ab-icon-menu-item__icon-block ab-icon-menu-item__icon-block--clip'
					/>
					<span className='ab-icon-menu-item__text ab-icon-menu-item__text--highlight'>
						Настройки
					</span>
				</Link>
				<Link
					onClick={handleLogout}
					to='/'
					className='ab-icon-menu-item focus-outline ab-icon-menu-item--clip'>
					<PoweroffOutlined
						style={{ fontSize: "24px", color: "var(--logout-color)" }}
						className='ab-icon-menu-item__icon-block ab-icon-menu-item__icon-block--clip'
					/>
					<span className='ab-icon-menu-item__text ab-icon-menu-item__text--highlight'>
						Выход
					</span>
				</Link>
			</div>
		</>
	);
};

export default MobileNavigation;
