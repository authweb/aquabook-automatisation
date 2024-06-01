import React from 'react';
import { RedirectSettings } from '.';

const Settings = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Бизнес</h3>
      <RedirectSettings to="company" labelText="Компания" />
      <RedirectSettings to="services" labelText="Услуги" />
      <h3 className="text-lg font-semibold">Управление</h3>
      <RedirectSettings to="general" labelText="Общие" />
      <RedirectSettings to="service-record" labelText="Запись" />
      <RedirectSettings to="employees" labelText="Сотрудники" />
    </div>
  );
};

export default Settings;
