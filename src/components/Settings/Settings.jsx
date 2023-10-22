import React from 'react';
import { Card, Space } from 'antd';
import { RedirectSettings } from '.';
const Settings = () => {
  return (
    <>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: 'flex',
        }}>
        <Card title="Бизнес" color="#fff" size="small" style={{ background: '#001529' }}>
          <div className="settings-section" style={{ color: '#fff' }}>
            <RedirectSettings to="company" labelText="Компания" />
            <RedirectSettings to="location" labelText="Локация" />
            <RedirectSettings to="services" labelText="Услуги" />
          </div>
        </Card>
        <Card title="Управление" size="small" style={{ background: '#001529' }}>
          <RedirectSettings to="general" labelText="Общие" />
          <RedirectSettings to="service-record" labelText="Запись" />
          <RedirectSettings to="employees" labelText="Сотрудники" />
        </Card>
      </Space>
    </>
  );
};

export default Settings;
