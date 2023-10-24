import React from 'react';
import { Card, Space } from 'antd';
import { RedirectSettings } from '.';
const Settings = () => {
  return (
    <>
      <Space
        direction="vertical"
        size="small"
        rowGap="10"
        style={{
          display: 'flex',
        }}>
        <h3>Бизнес</h3>
        <RedirectSettings to="company" labelText="Компания" />
        <RedirectSettings to="services" labelText="Услуги" />
        <h3>Управление</h3>
        <RedirectSettings to="general" labelText="Общие" />
        <RedirectSettings to="service-record" labelText="Запись" />
        <RedirectSettings to="employees" labelText="Сотрудники" />
      </Space>
    </>
  );
};

export default Settings;
