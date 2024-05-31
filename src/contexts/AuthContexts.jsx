import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [users, setUsers] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const userToken = localStorage.getItem("userToken");
		const userData = localStorage.getItem("userData");

		if (userToken) {
			setUsers(JSON.parse(userData));
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	const login = async (userData, role) => {
		localStorage.setItem("userToken", userData.token);
		localStorage.setItem("userData", JSON.stringify({ ...userData, role }));
		setUsers({ ...userData, role });
		setIsAuthenticated(true);
		axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
		console.log("Users data from AuthContext:", userData);
	};

	const hasRole = requiredRole => {
		if (!users) {
			return false;
		}

		return users.role === requiredRole;
	};

	const logout = () => {
		localStorage.removeItem("userToken");
		localStorage.removeItem("userData");
		delete axios.defaults.headers.common["Authorization"];
		setUsers(null);
		setIsAuthenticated(false);
		navigate("/");
	};

	const updateProfileInfo = newProfileData => {
		const updatedUserData = {
			...users,
			...newProfileData,
		};
		localStorage.setItem("userData", JSON.stringify(updatedUserData));
		setUsers(updatedUserData);
		console.log("Profile updated in context:", updatedUserData);
	};

	return (
		<AuthContext.Provider
			value={{
				users,
				isAuthenticated,
				login,
				logout,
				updateProfileInfo,
				hasRole,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
