import React from 'react';
import { Card, Space } from 'antd';
import { Company, RedirectSettings } from '.';
const Settings = () => {
  return (
    <>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: 'flex',
        }}>
        <Card title="Бизнес" size="small">
          <div className="profile-section">
            <RedirectSettings to="company" labelText="Компания" element={<Company />} />
            <RedirectSettings to="location" labelText="Локация" />
            <RedirectSettings to="services" labelText="Услуги" />
          </div>
        </Card>
        <Card title="Управление" size="small">
          <RedirectSettings to="general" labelText="Общие" />
          <RedirectSettings to="service-record" labelText="Запись" />
          <RedirectSettings to="employees" labelText="Сотрудники" />
        </Card>
      </Space>
    </>
  );
};

export default Settings;
