import React from 'react';
import { useAuth } from '../../contexts/AuthContexts';

import { HeaderUser } from '../../components';

const PersonalInfo = () => {
  const { user } = useAuth();
  return (
    <div className="app-wrapper">
      <div className="personalProfile-container">
        <HeaderUser title="Персональная информация" />
        <div className="personalProfile-section">
          {user && (
            <div className="personalInfo__flex">
              <div className="personalInfo__flex__pcol">
                <p className="personalInfo__flex__pcol-p">
                  {user.first_name} {user.last_name}
                </p>
                <p className="personalInfo__flex__pcol-p">{user.email}</p>
                <p className="personalInfo__flex__pcol-p">{user.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
