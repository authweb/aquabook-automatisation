import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  //   const [carInfo, setCarInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const [isLoadingCarInfo, setIsLoadingCarInfo] = useState(true);
  //   const [isCarInfoDeleted, setIsCarInfoDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');

    if (userToken) {
      setUsers(JSON.parse(userData));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('userToken', userData.token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setUsers(userData);
    setIsAuthenticated(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    console.log('Clients data from AuthContext:', userData);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    delete axios.defaults.headers.common['Authorization'];
    setUsers(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  //   const updateCarInfo = (carInfo) => {
  //     setCarInfo(carInfo);
  //     localStorage.setItem('carInfo', JSON.stringify(carInfo));
  //   };

  //   const deleteCarInfo = async () => {
  //     try {
  //       await axios.delete('/api/deletecarinfo', { data: { clients_id: users.id } });
  //       setIsCarInfoDeleted(true);

  //       console.log('Car info deleted');
  //     } catch (error) {
  //       console.error('Error deleting car info:', error);
  //     }
  //   };

  //   useEffect(() => {
  //     if (isCarInfoDeleted) {
  //       setCarInfo(null);
  //     }
  //   }, [isCarInfoDeleted]);

  return (
    <AuthContext.Provider
      value={{
        users,
        isAuthenticated,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
