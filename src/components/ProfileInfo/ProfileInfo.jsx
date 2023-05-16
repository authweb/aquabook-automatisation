import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContexts';

const ProfileInfo = () => {
  const { user } = useAuth();
  return (
    <div className="profileInfo">
      {user && (
        <div className="profileInfo__flex">
          <div className="profileInfo__flex__pcol">
            <p className="profileInfo__flex__pcol-p">
              {user.first_name} {user.last_name}
            </p>
            <p className="profileInfo__flex__pcol-p">{user.email}</p>
            <p className="profileInfo__flex__pcol-p">{user.phone}</p>
          </div>
          <Link className="profileInfo__flex-link" to="/personal-info">
            Личная информация
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
