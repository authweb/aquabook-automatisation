import React from 'react';
import { CarInfoForm } from '../../components/index';
import { HeaderDashboard } from '../../components';

const CarInfoPage = () => {
  return (
    <div className="app-wrapper">
      <div className="personalProfile-container">
        <HeaderDashboard title="Добавить информацию о машине" />
        <div className="personalProfile-section">
          <CarInfoForm />
        </div>
      </div>
    </div>
  );
};

export default CarInfoPage;
