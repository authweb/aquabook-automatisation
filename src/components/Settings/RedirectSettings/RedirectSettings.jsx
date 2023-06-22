import React from 'react';
import { useAuth } from '../../../contexts/AuthContexts';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';

import '../../../scss/settings.scss';

const RedirectSettings = ({ to, labelText }) => {
  const { users } = useAuth();

  return (
    <div className="app-wrapper">
      <Link className="settingsInfo" to={to}>
        {users && (
          <div className="settingsInfo__flex">
            <div className="settingsInfo__flex__pcol">
              <p className="settingsInfo__flex__pcol-p">{labelText}</p>
            </div>
            <Link to={to} className="settingsInfo__flex-arrow">
              <MdArrowForwardIos />
            </Link>
          </div>
        )}
      </Link>
    </div>
  );
};

export default RedirectSettings;
