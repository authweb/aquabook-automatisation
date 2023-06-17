import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import {
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  IdcardOutlined,
  BarsOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { useNavigate, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import {
  Calendar,
  Clients,
  EmployeesPersona,
  PersonalInfoDashboard,
  Settings,
  DashboardMain,
  Employees,
} from '../../components';
import SubMenu from 'antd/es/menu/SubMenu';

import Logo from '../../assets/images/Logo.png';

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
  let { id } = useParams();
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/api/employees')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.employees);
      });
  }, []);

  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const [breadcrumbNameMap, setBreadcrumbNameMap] = useState({
    '/dashboard': 'Панель управления',
    '/dashboard/employees': 'Сотрудники',
    '/dashboard/time-table': 'Расписание',
    '/dashboard/services': 'Услуги',
    '/dashboard/profile': 'Профиль',
    '/dashboard/settings': 'Настройки',
    '/dashboard/clients': 'Клиенты',
  });
  const extraBreadcrumbItems = pathSnippets
    .map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      let breadcrumbName;
      if (url.includes('employees') && id) {
        const employee = employees.find((emp) => emp.id === id);
        breadcrumbName = employee ? `${employee.first_name}` : 'Loading...';
      } else {
        breadcrumbName = breadcrumbNameMap[url];
      }
      if (breadcrumbName) {
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{breadcrumbName}</Link>
          </Breadcrumb.Item>
        );
      }
      return null;
    })
    .filter(Boolean);

  const handleEmployeeData = (employee) => {
    setBreadcrumbNameMap((prev) => ({
      ...prev,
      [`/dashboard/employees/${employee.id}`]: `${employee.first_name}`,
    }));
  };

  const breadcrumbItems = [<Breadcrumb.Item key="dashboard"></Breadcrumb.Item>].concat(
    extraBreadcrumbItems,
  );

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
                navigate('/');
              } else if (
                key === 'time-table' ||
                key === 'services' ||
                key === 'settings' ||
                key === 'profile' ||
                key === 'clients'
              ) {
                navigate(`./${key}`);
              } else {
                // Предполагается, что все остальные ключи являются ID сотрудников
                navigate(`./employees/${key}`);
              }
            }}>
            <Link to="/dashboard">
              <img src={Logo} style={{ width: '100%' }} alt="AQUALORD" />
            </Link>
            <Menu.Item key="time-table" icon=<TeamOutlined />>
              <Link to="time-table">Календарь</Link>
            </Menu.Item>
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
            </Menu.Item>
            <Menu.Item key="signout" icon=<PoweroffOutlined /> danger>
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
        <Content
          style={{
            margin: '0 16px',
          }}>
          <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}>
            <Routes>
              <Route path="/">
                <Route index element={<DashboardMain />} />
                <Route path="employees/">
                  <Route index element={<Employees />} />
                  <Route
                    path=":id"
                    element={<EmployeesPersona onEmployeeData={handleEmployeeData} />}
                  />
                </Route>
                <Route path="clients" element={<Clients />} />
                <Route path="time-table" element={<Calendar />} />
                <Route path="services" element={<div>Services</div>} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<PersonalInfoDashboard />} />
              </Route>
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
