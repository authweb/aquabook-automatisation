import React from 'react';
import { CarInfoForm } from '../../components/index';
import { HeaderUser } from '../../components';

const CarInfoPage = () => {
  return (
    <div className="app-wrapper">
      <div className="personalProfile-container">
        <HeaderUser title="Добавить информацию о машине" />
        <div className="personalProfile-section">
          <CarInfoForm />
        </div>
      </div>
    </div>
  );
};

export default CarInfoPage;
