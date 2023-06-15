import React from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import { Row, Col } from 'antd';

import { HeaderUser, ChangePassword, ChangePhoneNumber, ChangeEmail } from '../../components';
import '../../scss/profile.scss';

const PersonalInfoDashboard = () => {
  const { users, setUsers } = useAuth();

  return (
    <div className="app-wrapper">
      <Row>
        <Col span={9}>
          <div className="personalProfile-container">
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
        </Col>
        <Col span={14}>
          <div className="personalProfile-container">
            <HeaderUser title="Настройки" />
            <div className="personalProfile-section">
              <ChangePassword />
              <ChangePhoneNumber />
              <ChangeEmail />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalInfoDashboard;
