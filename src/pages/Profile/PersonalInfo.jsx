import React from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import { Link } from 'react-router-dom';

import { HeaderUser } from '../../components';

const PersonalInfo = () => {
  const { clients, carInfo } = useAuth();

  const { car_number, car_make, car_model, car_type } = carInfo || {};

  return (
    <div className="app-wrapper">
      <div className="personalProfile-container">
        <HeaderUser title="Персональная информация" />
        <div className="personalProfile-section">
          <div className="personalInfo__flex">
            <div className="personalInfo__flex__pcol">
              <p className="personalInfo__flex__pcol-p">
                {clients?.first_name} {clients?.last_name}
              </p>
              <p className="personalInfo__flex__pcol-p">{clients?.email}</p>
              <p className="personalInfo__flex__pcol-p">{clients?.phone}</p>
            </div>
          </div>
        </div>

        {/* carInfo.car_number,
                carInfo.car_make,
                carInfo.car_model,
                carInfo.car_type, */}
        <div className="personalProfile-section">
          {console.log(car_number, car_make, car_model, car_type)}
          {carInfo ? (
            <div className="carsUser">
              <p>Информация о машине:</p>
              <p>Номер автомобиля: {carInfo.car_number}</p>
              <p>Марка автомобиля: {carInfo.car_make}</p>
              <p>Модель автомобиля: {carInfo.car_model}</p>
              <p>Тип автомобиля: {carInfo.car_type}</p>
              <Link to="car-info">Обновить информацию о машине</Link>
            </div>
          ) : (
            <div className="noCarInfo">
              <p>Информация о машине отсутствует</p>
              <Link to="car-info">Добавить информацию о машине</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
