import React from 'react';
import { useAuth } from '../../contexts/AuthContexts';

const ProfileLogout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="logout">
      <button onClick={handleLogout}>Выход</button>
    </div>
  );
};

export default ProfileLogout;
