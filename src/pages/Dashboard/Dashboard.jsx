import React, { useState, useEffect, useReducer } from "react";
import { useNavigate, Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
	UserOutlined, SettingOutlined, TeamOutlined, IdcardOutlined,
	BarsOutlined, PoweroffOutlined, CalendarOutlined, PieChartOutlined
} from "@ant-design/icons";
import { ConfigProvider, Layout, Menu, Button, Space, Dropdown, theme } from "antd";

import ruRU from "antd/lib/locale/ru_RU";
import { useAuth } from "../../contexts/AuthContexts";
import { handleFileUpload, handleDownload } from "../../contexts/excelHandlers";
import { CalendarProvider } from "../../contexts/CalendarContexts";

import useEmployeeData from "../../hooks/useEmployeeData";
import useDateHandler from "../../hooks/useDateHandler";

import { reducer, initialState } from "../../reducers/reduser";
import DashboardRoutes from "./DashboardRoutes";
import { AppointmentDetails, AddAppointments, CalendarNavigator, Breadcrumbs, MobileNavigation } from "../../components";

import { ReactComponent as Logo } from "../../assets/images/logomini.svg";
import "../../scss/dashboard.scss";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
	const { token: { colorBgContainer } } = theme.useToken();
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = useParams();

	const [showAddAppointments, setShowAddAppointments] = useState(false);
	const { users, logout } = useAuth();
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState({});
	const [service, setService] = useState("");
	const { today, rangeStart, setToday, setRangeStart } = useDateHandler();
	const { employees, error } = useEmployeeData();
	const [stats, dispatch] = useReducer(reducer, initialState);
	const [showSider, setShowSider] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [layoutClassName, setLayoutClassName] = useState("ab-page");
	const [wrapperClassName, setWrapperClassName] = useState("ab-page__wrapper");

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth < 768);
		}

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const match = location.pathname.match(/\/dashboard\/appointments\/(\d+)/);
	const isAppointmentDetailsPage = match !== null;

	useEffect(() => {
		if (location.pathname === "/dashboard/calendar/add" && rangeStart) {
			setShowAddAppointments(true);
		} else {
			setShowAddAppointments(false);
		}
	}, [location.pathname, location.search, rangeStart, showAddAppointments, today]);

	useEffect(() => {
		const newDate = dayjs().format("YYYY-MM-DD");
		if (rangeStart !== newDate) {
			dispatch({ type: "SET_TODAY", payload: newDate });
			dispatch({ type: "SET_RANGE_START", payload: newDate });
		}
	}, [dispatch, rangeStart]);

	const handleLogout = () => {
		logout();
	};

	useEffect(() => {
		let newLayoutClassName = "ab-page";
		let newWrapperClassName = "ab-page__wrapper";

		const isValidToday = today ? dayjs(today, "YYYY-MM-DD").isValid() : false;
		const isValidRangeStart = rangeStart ? dayjs(rangeStart, "YYYY-MM-DD").isValid() : false;
		const isDateParamsValid = isValidToday && isValidRangeStart;

		if (location.pathname === "/dashboard" || isDateParamsValid) {
			newLayoutClassName = "eb-calendar-page";
			newWrapperClassName = "eb-calendar eb-calendar-page__calendar";
		}

		setLayoutClassName(newLayoutClassName);
		setWrapperClassName(newWrapperClassName);
		setShowSider(location.pathname === "/dashboard" || isDateParamsValid);
	}, [location.pathname, location.search, rangeStart, today]);

	const getCSSVariable = (variable) => getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

	const themeVariables = {
		colorBgContainer: getCSSVariable('--bg-color'),
		colorText: getCSSVariable('--text-dark'),
		colorLink: getCSSVariable('--link-color'),
		fontFamily: `'Montserrat', sans-serif`,
		colorBgElevated: getCSSVariable('--card-color'),
		boxShadow: "none",
		colorIcon: getCSSVariable('--white-color'),
		itemSelectedColor: getCSSVariable('--primary-color'),
		horizontalItemHoverColor: getCSSVariable('--primary-color'),
	};

	const handleMenuClick = (e) => {
		if (e.key === "1") {
			handleDownload();
		} else if (e.key === "2") {
			handleFileUpload();
		}
	};

	const menuItems = [
		{ label: "Выгрузить в Excel", key: "1" },
		{ label: "Загрузить в Excel", key: "2" },
	];

	const siderItems = [
		{
			key: "logo",
			label: (
				<Link to={`/dashboard/calendar?today=${stats.today}&range_start=${stats.rangeStart}`}>
					<Logo style={{ maxWidth: "80%", margin: "0 auto", display: "flex", justifyContent: "center" }} />
				</Link>
			),
			type: "group",
		},
		{
			key: "dashboard",
			icon: <CalendarOutlined />,
			label: <Link to={`/dashboard/calendar?today=${stats.today}&range_start=${stats.rangeStart}`}>Календарь</Link>,
		},
		{
			key: "sub1",
			icon: <UserOutlined />,
			label: "Сотрудники",
			children: employees.map(employee => ({
				key: employee.id,
				label: <Link to={`employees/${employee.id}`}>{employee.first_name}</Link>,
			})),
		},
		{
			key: "clients",
			icon: <TeamOutlined />,
			label: <Link to="clients">Клиенты</Link>,
		},
		{
			key: "services",
			icon: <BarsOutlined />,
			label: <Link to="services">Услуги</Link>,
		},
		{
			key: "analytics",
			icon: <PieChartOutlined />,
			label: <Link to="analytics">Аналитика</Link>,
		},
		{
			key: "settings",
			icon: <SettingOutlined />,
			label: <Link to="settings">Настройки</Link>,
		},
		{
			key: "profile",
			icon: <IdcardOutlined />,
			label: users ? <Link to={`users/${users.id}`}>Личный кабинет</Link> : null,
		},
		{
			key: "signout",
			icon: <PoweroffOutlined />,
			label: <Link onClick={handleLogout} to="/">Выход</Link>,
			danger: true,
		},
	];

	return (
		<ConfigProvider theme={{ token: { themeVariables } }} locale={ruRU}>
			<CalendarProvider>
				{showAddAppointments && (
					<AddAppointments
						service={service}
						setService={setService}
						categories={categories}
						services={services}
					/>
				)}

				{isAppointmentDetailsPage && <AppointmentDetails />}

				{!showAddAppointments && !isAppointmentDetailsPage && (
					<Layout style={{ height: "100%", backgroundColor: themeVariables.colorBgContainer }}>
						{!isMobile && (
							<Sider trigger={null} collapsible theme="light" collapsed={true} style={{ backgroundColor: themeVariables.colorBgContainer }}>
								{users ? (
									<Menu
										theme="light"
										mode="inline"
										items={siderItems}
									/>
								) : (
									<div>Loading...</div>
								)}
							</Sider>
						)}

						<Layout className={layoutClassName} theme="light">
							<Content className={wrapperClassName} theme="light">
								{!isMobile && (
									<Header
										className="eb-calendar_title"
										style={{ padding: 0 }}
										theme="light"
									>
										{["/dashboard/services", "/dashboard/clients"].includes(
											location.pathname
										) && (
												<Dropdown menu={{ items: menuItems, onClick: handleMenuClick }}>
													<Button>
														<Space>Оперции с Excel</Space>
													</Button>
												</Dropdown>
											)}
										<Breadcrumbs />
									</Header>
								)}
								<DashboardRoutes />
							</Content>

							{showSider && !isMobile && (
								<Sider className="eb-calendar-page__aside" theme="light" style={{ maxWidth: "375px" }}>
									<CalendarNavigator />
								</Sider>
							)}
						</Layout>

						{isMobile && <MobileNavigation stats={stats} />}
					</Layout>
				)}
			</CalendarProvider>
		</ConfigProvider>
	);
};

export default Dashboard;
