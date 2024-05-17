import React, { useState, useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContexts";
import {
	HomePage,
	Login,
	Register,
	Dashboard,
	Profile,
	Appointment,
	LoginToProfile,
} from "./pages";
import { UserContext } from "./contexts/UserContexts";
import AuthProvider from "./contexts/AuthContexts";

import "./scss/globalscss/_global.scss";

const useUpdateViewportDimensions = () => {
	useEffect(() => {
		const updateDimensions = () => {
			const html = document.documentElement;
			html.style.setProperty("--viewport-width", `${window.innerWidth}px`);
			html.style.setProperty("--viewport-height", `${window.innerHeight}px`);
		};

		window.addEventListener("resize", updateDimensions);
		updateDimensions();

		return () => window.removeEventListener("resize", updateDimensions);
	}, []);
};

const getClassName = location => {
	const isHomePage = location.pathname === "/";
	const appointmentDetailsRegex = /\/dashboard\/appointments\/\d+/;
	const isAppointmentDetailsPage = appointmentDetailsRegex.test(
		location.pathname,
	);

	if (
		location.pathname.includes("/dashboard/calendar/add") ||
		isAppointmentDetailsPage
	) {
		return "eb-page-aside";
	} else if (location.pathname === "/login") {
		return "eb-auth-layout";
	} else if (location.pathname === "/register") {
		return "eb-register-page eb-register-page--has-image";
	} else if (
		location.pathname === "/booking" ||
		location.pathname === "/booking/" ||
		location.pathname === "/booking/profile" ||
		location.pathname === "/booking/profile/" ||
		location.pathname === "/booking/profile/login"
	) {
		return "app-wrapper";
	} else {
		return "ab-layout";
	}
};

const App = () => {
	useUpdateViewportDimensions();
	const location = useLocation();
	const navigate = useNavigate();
	const { users } = useContext(AuthContext);
	const [_, setUsers] = useState(null);
	const classNameMain =
		location.pathname === "/" ? "flex flex-col min-h-screen" : "";
	const className = getClassName(location);

	return (
		<div id='__layout'>
			<div className={className}>
				<AuthProvider>
					<UserContext.Provider value={{ users, setUsers }}>
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='booking/*'>
								<Route index element={<Appointment />} />
								<Route path='profile/*'>
									<Route index element={<Profile />} />
									<Route path='login' element={<LoginToProfile />} />
								</Route>
							</Route>

							<Route path='dashboard/*' element={<Dashboard />} />
							<Route path='*' element={<div>404 Not Found</div>} />
						</Routes>
					</UserContext.Provider>
				</AuthProvider>
			</div>
		</div>
	);
};

export default App;
