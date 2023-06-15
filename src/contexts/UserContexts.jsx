import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(null);

  // Функции для установки значения пользователя
  const login = (userData) => {
    setUsers(userData);
  };

  const logout = () => {
    setUsers(null);
  };

  return <UserContext.Provider value={{ users, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
