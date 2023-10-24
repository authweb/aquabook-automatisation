import React from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import { Row, Col } from 'antd';

import { HeaderUser, ChangePassword, ChangePhoneNumber, ChangeEmail } from '../../components';
import '../../scss/profile.scss';

const PersonalInfoDashboard = () => {
  const { users, setUsers } = useAuth();

  return (
    <>
      <div className="container ab-page__grid">
        <div>
          <HeaderUser title="Личная информация" />
          <div className="personalProfile-section">
            <div className="personalInfo__flex">
              <div className="personalInfo__flex__pcol">
                <p className="personalInfo__flex__pcol-p">
                  {users?.first_name} {users?.last_name}
                </p>
                <p className="personalInfo__flex__pcol-p">{users?.email}</p>
                <p className="personalInfo__flex__pcol-p">{users?.phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <HeaderUser title="Настройки" />
          <div className="personalProfile-section">
            <ChangePassword />
            <ChangePhoneNumber />
            <ChangeEmail />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoDashboard;
