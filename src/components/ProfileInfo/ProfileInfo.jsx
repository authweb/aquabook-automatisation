import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContexts';
import { MdArrowForwardIos } from 'react-icons/md';

const ProfileInfo = () => {
  const { user } = useAuth();
  return (
    <Link className="profileInfo" to="personal-info">
      {user && (
        <div className="profileInfo__flex">
          <div className="profileInfo__flex__pcol">
            <p className="profileInfo__flex__pcol-p">
              {user.first_name} {user.last_name}
            </p>
            <p className="profileInfo__flex__pcol-p">{user.email}</p>
            <p className="profileInfo__flex__pcol-p">{user.phone}</p>
          </div>
          <Link to="personal-info" className="profileInfo__flex-arrow">
            <MdArrowForwardIos />
          </Link>
        </div>
      )}
    </Link>
  );
};

export default ProfileInfo;
