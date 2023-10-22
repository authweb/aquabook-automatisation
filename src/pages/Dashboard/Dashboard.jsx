import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import {
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  IdcardOutlined,
  BarsOutlined,
  PoweroffOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { ConfigProvider, Breadcrumb, Layout, Menu, theme, Button, Space, Dropdown } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import '../../scss/dashboard.scss';
import { handleFileUpload, handleDownload } from '../../contexts/excelHandlers';
import { CalendarProvider } from '../../contexts/CalendarContexts';

import {
  CalendarNavigator,
  CalendarDay,
  Clients,
  EmployeesPersona,
  PersonalInfoDashboard,
  Settings,
  DashboardMain,
  Employees,
  ServicesManagement,
} from '../../components';

import { Company } from '../../components/Settings';

import SubMenu from 'antd/es/menu/SubMenu';

import LogoMini from '../../assets/images/logomini.svg';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  //   const [collapsed, setCollapsed] = useState(false);
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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data.employees);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);
  const [showSider, setShowSider] = useState(false);
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  useEffect(() => {
    // Проверьте, соответствует ли текущий путь корневому пути или пути к странице календаря
    setShowSider(location.pathname === '/' || location.pathname.startsWith('/datetable'));
  }, [location.pathname]);

  const [breadcrumbNameMap, setBreadcrumbNameMap] = useState({
    '/dashboard': 'Панель управления',
    '/dashboard/employees': 'Сотрудники',
    '/dashboard/:datetable': 'Расписание',
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
            <Link to={url} style={{ color: '#fff' }}>
              {breadcrumbName}
            </Link>
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
  const handleMenuClick = (e) => {
    if (e.key === '1') {
      handleDownload();
    } else if (e.key === '2') {
      handleFileUpload();
    }
  };
  const items = [
    {
      label: 'Выгрузить в Excel',
      key: '1',
    },
    {
      label: 'Загрузить в Excel',
      key: '2',
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <ConfigProvider locale={ruRU}>
      <CalendarProvider>
        <Layout style={{ height: '100vh' }}>
          <Sider trigger={null} collapsible collapsed={true}>
            {users ? (
              <Menu
                theme="dark"
                mode="inline"
                onClick={({ key }) => {
                  if (key === 'signout') {
                    navigate('/');
                  } else if (
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
                  <img
                    src={LogoMini}
                    style={{
                      maxWidth: '80%',
                      margin: '0 auto',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    alt="AquaBook Logo"
                  />
                </Link>
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
          <Layout style={{ background: '#001529' }}>
            {/* <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
              {['/dashboard/services', '/dashboard/clients'].includes(location.pathname) && (
                <Dropdown menu={menuProps}>
                  <Button>
                    <Space>Оперции с Excel</Space>
                  </Button>
                </Dropdown>
              )}
            </Header> */}
            <Content
              style={{
                margin: '0 16px',
              }}>
              <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
              <div
                style={{
                  minHeight: 360,
                  background: '#001529',
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
                    <Route path=":datetable" element={<CalendarDay />} />
                    <Route path="services" element={<ServicesManagement />} />
                    <Route path="settings/">
                      <Route index element={<Settings />} />
                      <Route path="company" element={<Company />} />
                      <Route path="location" element={<Company />} />
                      <Route path="services" element={<Company />} />
                      <Route path="general" element={<Company />} />
                      <Route path="service-record" element={<Company />} />
                      <Route path="employees" element={<Company />} />
                    </Route>

                    <Route path="profile" element={<PersonalInfoDashboard />} />
                  </Route>
                </Routes>
              </div>
            </Content>
            {showSider && (
              <Sider width={212} style={{ background: '#001529' }}>
                <CalendarNavigator />
              </Sider>
            )}

            {/* <Footer
              style={{
                textAlign: 'center',
                background: '#001529',
                color: '#fff',
              }}>
              AQUALORD ©2023 Created by Authweb
            </Footer> */}
          </Layout>
        </Layout>
      </CalendarProvider>
    </ConfigProvider>
  );
};

export default Dashboard;
