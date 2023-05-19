import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [clients, setClients] = useState(null);
  const [carInfo, setCarInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingCarInfo, setIsLoadingCarInfo] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const carInfo = localStorage.getItem('carInfo');

    if (userData) {
      const { token, id, first_name, last_name, phone, email } = JSON.parse(userData);
      setClients({ token, id, first_name, last_name, phone, email });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    if (carInfo) {
      console.log(carInfo);
      const { clients_id, car_number, car_make, car_model, car_type } = JSON.parse(carInfo);
      setCarInfo({ clients_id, car_number, car_make, car_model, car_type });
      setIsLoadingCarInfo(false); // Информация о машине загружена
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setClients(userData);
    setIsAuthenticated(true);
    console.log('Clients data from AuthContext:', userData);
    // Вывод данных пользователя в консоль
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setClients(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const updateCarInfo = (carInfo) => {
    setCarInfo(carInfo);
    localStorage.setItem('carInfo', JSON.stringify(carInfo));
  };

  return (
    <AuthContext.Provider
      value={{ clients, carInfo, isAuthenticated, isLoadingCarInfo, login, logout, updateCarInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
