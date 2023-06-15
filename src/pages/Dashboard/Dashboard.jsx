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
import { Breadcrumb, Layout, Menu, Item, theme } from 'antd';

import { Clients, Employees, PersonalInfoDashboard, ProfileInfo } from '../../components';

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
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => {
            if (key === 'signout') {
            } else {
              navigate(key);
            }
          }}>
          <Menu.Item key="employees" icon=<UserOutlined />>
            <Link to="employees">Сотрудники</Link>
          </Menu.Item>
          <Menu.Item key="clients" icon=<TeamOutlined />>
            <Link to="clients">Клиенты</Link>
          </Menu.Item>
          <Menu.Item key="services" icon=<BarsOutlined />>
            <Link to="services">Услуги</Link>
          </Menu.Item>
          <Menu.Item key="settings" icon=<SettingOutlined />>
            <Link to="settings">Настройки</Link>
          </Menu.Item>
          <Menu.Item key="profile" icon=<IdcardOutlined />>
            <Link to="profile">Личный кабинет</Link>
          </Menu.Item>
          <Menu.Item key="signout" icon=<PoweroffOutlined />>
            <Link to="signout">Выход</Link>
          </Menu.Item>
        </Menu>
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
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}>
            <Routes>
              <Route path="profile" element={<PersonalInfoDashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="clients" element={<Clients />} />
              <Route path="services" element={<div>Services</div>} />
              <Route path="settings" element={<div>Settings</div>} />
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
