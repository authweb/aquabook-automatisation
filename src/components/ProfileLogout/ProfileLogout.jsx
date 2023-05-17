import React from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import { MdLogout } from 'react-icons/md';

const ProfileLogout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button className="logout">
      <MdLogout className="logout-icon" onClick={handleLogout} />
      <label className="logout-label" onClick={handleLogout}>
        Выход
      </label>
    </button>
  );
};

export default ProfileLogout;
