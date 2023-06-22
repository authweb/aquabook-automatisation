import React from 'react';
import { useAuth } from '../../../contexts/AuthContexts';

import { HeaderUser } from '../../../components';
import '../../../scss/profile.scss';

const PersonalInfo = () => {
  const { users } = useAuth();

  return (
    <div className="app-wrapper">
      {/* <Link className="profileInfo" to="company">
        {users && (
          <div className="profileInfo__flex">
            <div className="profileInfo__flex__pcol">
              <p className="profileInfo__flex__pcol-p">
                {users.first_name} {users.last_name}
              </p>
              <p className="profileInfo__flex__pcol-p">{users.email}</p>
              <p className="profileInfo__flex__pcol-p">{users.phone}</p>
            </div>
            <Link to="company" className="profileInfo__flex-arrow">
              <MdArrowForwardIos />
            </Link>
          </div>
        )}
      </Link> */}
      <div className="personalProfile-container">
        <HeaderUser title={'AQUALORD Detailing'} />
        <div className="personalProfile-section">
          <div className="personalInfo__flex">
            <div className="personalInfo__flex__pcol">
              <p className="personalInfo__flex__pcol-p"></p>
              <p className="personalInfo__flex__pcol-p">{users?.email}</p>
              <p className="personalInfo__flex__pcol-p">{users?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
