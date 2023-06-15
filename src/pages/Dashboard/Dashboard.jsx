import React, { useState } from 'react';
import {
  FileOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  IdcardOutlined,
  ProfileOutlined,
  BarsOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { useRoutes, useNavigate, Link, Routes, Route } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { Clients, PersonalInfoDashboard, ProfileInfo } from '../../components';

const { Header, Content, Footer, Sider } = Layout;

// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
// // 'dashboard/sub1/tom';
// // 'dashboard/sub2/list';
// const items = [
//   getItem('Сотрудники', 'dashboard/employees', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Клиенты', 'dashboard/clients', <TeamOutlined />, [
//     getItem('Клиентская база', 'list'),
//     getItem('Категории клиентов', 'category'),
//   ]),
//   getItem('Files', '9', <FileOutlined />),
//   getItem('Личный кабинет', 'dashboard/:id/profile', <ProfileOutlined />),
// ];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => {
            if (key === 'signout') {
            } else {
              navigate(key);
            }
          }}
          items={[
            { label: 'Сотрудники', key: 'employees', icon: <UserOutlined /> },
            { label: 'Клиенты', key: 'clients', icon: <TeamOutlined /> },
            { label: 'Услуги', key: 'services', icon: <BarsOutlined /> },
            { label: 'Настройки', key: 'settings', icon: <SettingOutlined /> },
            { label: 'Личный кабинет', key: 'profile', icon: <IdcardOutlined /> },
            { label: 'Выход', key: 'signout', icon: <PoweroffOutlined />, danger: true },
          ]}></Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}>
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}>
            <Routes>
              <Route path="/employees" element={<div>Employees</div>} />
              <Route path="/clients" element={<div>Clients</div>} />
              <Route path="/services" element={<div>Services</div>} />
              <Route path="/settings" element={<div>Settings</div>} />
              <Route path="/profile" element={<PersonalInfoDashboard />} />
              <Route path="signout" element={<div>Signout</div>} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}>
          AQUALORD ©2023 Created by Authweb
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
