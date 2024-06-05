import React, { useState } from 'react';
import { RedirectSettings } from '.';

const Settings = () => {
  const [isBusinessOpen, setIsBusinessOpen] = useState(true);
  const [isManagementOpen, setIsManagementOpen] = useState(true);

  const toggleSection = (section) => {
    if (section === 'business') {
      setIsBusinessOpen(!isBusinessOpen);
    } else if (section === 'management') {
      setIsManagementOpen(!isManagementOpen);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3
          className="text-lg font-semibold cursor-pointer"
          onClick={() => toggleSection('business')}
        >
          Бизнес {isBusinessOpen ? '▲' : '▼'}
        </h3>
        {isBusinessOpen && (
          <div className="space-y-4">
            <RedirectSettings to="company" labelText="Компания" />
            <RedirectSettings to="services" labelText="Услуги" />
          </div>
        )}
      </div>
      <div>
        <h3
          className="text-lg font-semibold cursor-pointer"
          onClick={() => toggleSection('management')}
        >
          Управление {isManagementOpen ? '▲' : '▼'}
        </h3>
        {isManagementOpen && (
          <div className="space-y-4">
            <RedirectSettings to="general" labelText="Общие" />
            <RedirectSettings to="service-record" labelText="Запись" />
            <RedirectSettings to="employees" labelText="Сотрудники" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
