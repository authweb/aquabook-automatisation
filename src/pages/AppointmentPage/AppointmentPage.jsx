import React from 'react';
import '../../scss/form.scss'; // добавляем импорт стилей
import { AppointmentForm, Header } from '../../components';
const AppointmentPage = () => {
  return (
    <div className="appointment-page">
      <Header />
      <h1>Записаться на автомойку</h1>
      <AppointmentForm />
    </div>
  );
};

export default AppointmentPage;
