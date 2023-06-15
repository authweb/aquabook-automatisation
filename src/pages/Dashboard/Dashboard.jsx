import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContexts';
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
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { Clients, Employees, PersonalInfoDashboard } from '../../components';
import SubMenu from 'antd/es/menu/SubMenu';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const { users, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/employees')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.employees);
      });
  }, []);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {users ? (
          <Menu
            theme="dark"
            mode="inline"
            onClick={({ key }) => {
              if (key === 'signout') {
              } else {
                navigate(`./${key}`);
              }
            }}>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <UserOutlined /> <span>Сотрудники</span>
                </span>
              }>
              {employees &&
                employees.map((employee) => (
                  <Menu.Item key={employee.id}>
                    <Link to={`employees/${employee.id}`}>{employee.first_name}</Link>
                  </Menu.Item>
                ))}
            </SubMenu>
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
              {/* <Link to={`${users.id}/profile`}>Личный кабинет</Link> */}
            </Menu.Item>
            <Menu.Item key="signout" icon=<PoweroffOutlined />>
              <Link onClick={handleLogout} to="/">
                Выход
              </Link>
            </Menu.Item>
          </Menu>
        ) : (
          <div>Loading...</div>
        )}
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
              <Route path="employees" element={<Employees />} />
              <Route path="clients" element={<Clients />} />
              <Route path="services" element={<div>Services</div>} />
              <Route path="settings" element={<div>Settings</div>} />
              <Route path="profile" element={<PersonalInfoDashboard />} />
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
