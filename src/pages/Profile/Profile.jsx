import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContexts';
import {
  HeaderDashboard,
  ProfileInfo,
  ProfileLogout,
  NewAppointment,
  UserAppointment,
} from '../../components/index';

import '../../scss/profile.scss';

const Profile = () => {
  const navigate = useNavigate();
  const { clients, isAuthenticated } = useAuth();
  // Проверяем, аутентифицирован ли пользователь
  useEffect(() => {
    // Проверяем, аутентифицирован ли пользователь
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="app-wrapper">
      <div className="profile-container">
        <HeaderDashboard title="Личный кабинет" />
        {clients && (
          <>
            <div className="profile-section">
              <ProfileInfo />
            </div>

            <div className="profile-section">
              <UserAppointment />
            </div>

            <div className="profile-section">
              <ProfileLogout />
            </div>

            <div className="profile-section btn-new">
              <NewAppointment btn="Новая запись" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
