import React from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import { Link } from 'react-router-dom';

import { HeaderDashboard, NewAppointment, DeleteCarInfo } from '../../components';
import '../../scss/profile.scss';

const PersonalInfo = () => {
  const { users, carInfo } = useAuth();

  const { client_id } = carInfo || {
    client_id: null,
  };

  return (
    <div className="app-wrapper">
      <div className="personalProfile-container">
        <HeaderDashboard title="Персональная информация" />
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
        <div className="personalProfile-section">
          {carInfo && client_id ? (
            <div className="personalProfile carInfo">
              <h3 className="carInfo-h3">Информация о машине:</h3>
              <p className="carInfo-p">Номер автомобиля: {carInfo.car_number}</p>
              <p className="carInfo-p">Марка автомобиля: {carInfo.car_make}</p>
              <p className="carInfo-p">Модель автомобиля: {carInfo.car_model}</p>
              <p className="carInfo-p">Тип автомобиля: {carInfo.car_type}</p>
              <Link to="car-info" className="btn-update">
                <NewAppointment btn="Обновить" />
              </Link>
              <DeleteCarInfo />
            </div>
          ) : (
            <div className="pesronalProfile-noCarInfo">
              <p>Информация о машине отсутствует</p>
              <Link to="car-info" className="btn-update">
                <NewAppointment btn="Добавить информацию о машине" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
