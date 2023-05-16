import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContexts';
import {
  HeaderUser,
  ProfileInfo,
  ProfileLogout,
  NewAppointment,
  UserAppointment,
} from '../../components/index';

import '../../scss/profile.scss';

const Profile = () => {
  const navigate = useNavigate();
  //   const { user } = useContext(UserContext);
  const { user, isAuthenticated } = useAuth();

  // Проверяем, аутентифицирован ли пользователь
  if (!isAuthenticated) {
    return navigate('/login');
  } else {
    return (
      <div className="app-wrapper">
        <div className="profile-container">
          <HeaderUser />
          {user && (
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
                <NewAppointment />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default Profile;
