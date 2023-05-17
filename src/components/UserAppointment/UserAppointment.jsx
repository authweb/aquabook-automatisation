import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import { BsFillCalendar2RangeFill } from 'react-icons/bs';

const UserAppointment = () => {
  return (
    <Link className="userAppointments" to="my-appointments">
      <div className="userAppointments__flex">
        <Link to="my-appointments" className="userAppointments__flex-icon">
          <BsFillCalendar2RangeFill />
        </Link>
        <h3 className="userAppointments__flex-h3">Мои записи</h3>
      </div>
      <Link to="my-appointments" className="userAppointments-arrow">
        <MdArrowForwardIos />
      </Link>
    </Link>
  );
};

export default UserAppointment;
