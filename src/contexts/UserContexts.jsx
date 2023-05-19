import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [clients, setClients] = useState(null);

  // Функции для установки значения пользователя
  const login = (userData) => {
    setClients(userData);
  };

  const logout = () => {
    setClients(null);
  };

  return <UserContext.Provider value={{ clients, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
