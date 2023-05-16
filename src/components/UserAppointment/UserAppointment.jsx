import React from 'react';
import { Link } from 'react-router-dom';

const UserAppointment = () => {
  return (
    <div className="userAppointments">
      <h3>Мои записи</h3>
      <Link to="/appointments">Записи на мойку</Link>
    </div>
  );
};

export default UserAppointment;
