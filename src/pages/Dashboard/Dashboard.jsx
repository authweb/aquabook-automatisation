import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';

import { initialState, reducer } from '../../reducers/reduser';
import dayjs from 'dayjs';
import {
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  IdcardOutlined,
  BarsOutlined,
  PoweroffOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, theme, Button, Space, Dropdown } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';

import useEmployeeData from '../../hooks/useEmployeeData';
import useDateHandler from '../../hooks/useDateHandler';

import ruRU from 'antd/lib/locale/ru_RU';

import { useAuth } from '../../contexts/AuthContexts';
import { handleFileUpload, handleDownload } from '../../contexts/excelHandlers';
import { CalendarProvider } from '../../contexts/CalendarContexts';

import {
  AddAppointments,
  AppointmentDetails,
  CalendarNavigator,
  CalendarDay,
  Clients,
  EmployeesPersona,
  PersonalInfoDashboard,
  PersonalEdit,
  Settings,
  DashboardMain,
  Employees,
  ServicesManagement,
  Breadcrumbs,
} from '../../components';
import { Company, Services, ServicePage, ServiceAdd } from '../../components/Settings';

import LogoMini from '../../assets/images/logomini.svg';
import '../../scss/dashboard.scss';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  //   const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const [showSider, setShowSider] = useState(false);
  const [showAddAppointments, setShowAddAppointments] = useState(false);
  const { users, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState({});
  const [service, setService] = useState('');

  const { today, rangeStart, setToday, setRangeStart } = useDateHandler();
  const { employees, error } = useEmployeeData();
  const [stats, dispatch] = useReducer(reducer, initialState);

  const match = location.pathname.match(/\/dashboard\/appointments\/(\d+)/);
  const isAppointmentDetailsPage = match !== null;

  useEffect(() => {
    if (location.pathname === '/dashboard/calendar/add' && rangeStart) {
      setShowAddAppointments(true);
    } else {
      setShowAddAppointments(false);
    }
    console.log('stats.today:', today);
    console.log('stats.rangeStart:', rangeStart);
    console.log('Страница записи:', location.search, showAddAppointments);
  }, [location.pathname, location.search, rangeStart, showAddAppointments, today]);

  useEffect(() => {
    const newDate = dayjs().format('YYYY-MM-DD');
    if (rangeStart !== newDate) {
      console.log('Setting dates:', newDate, rangeStart);
      dispatch({ type: 'SET_TODAY', payload: newDate });
      dispatch({ type: 'SET_RANGE_START', payload: newDate });
    }
  }, [dispatch, rangeStart]);

  //   const pathSnippets = (location.pathname + location.search).split('/').filter((i) => i);

  const handleLogout = () => {
    logout();
  };
  //   let { id } = useParams();

  //   const currentUser = users.find((user) => user.id === id);

  useEffect(() => {
    // Определение классов для layout и wrapper
    let newLayoutClassName = 'ab-page'; // значение по умолчанию
    let newWrapperClassName = 'ab-page__wrapper'; // значение по умолчанию

    console.log('today:', today);
    console.log('rangeStart:', rangeStart);

    const isValidToday = today ? dayjs(today, 'YYYY-MM-DD').isValid() : false;
    const isValidRangeStart = rangeStart ? dayjs(rangeStart, 'YYYY-MM-DD').isValid() : false;

    console.log(isValidToday, isValidRangeStart);

    const isDateParamsValid = isValidToday && isValidRangeStart;

    console.log('location.search:', location.search);

    console.log(location.pathname, location.search, isDateParamsValid);

    if (location.pathname === '/dashboard' || isDateParamsValid) {
      newLayoutClassName = 'eb-calendar-page'; // изменить класс, если маршрут соответствует
      newWrapperClassName = 'eb-calendar eb-calendar-page__calendar'; // изменить класс, если маршрут соответствует
    }

    setLayoutClassName(newLayoutClassName);
    setWrapperClassName(newWrapperClassName);

    setShowSider(location.pathname === '/dashboard' || isDateParamsValid);
  }, [location.pathname, location.search, rangeStart, today]); // Обратите внимание, что теперь зависимость включает location.search

  // Предполагается, что у вас есть соответствующие состояния для хранения className:
  const [layoutClassName, setLayoutClassName] = useState('ab-page');
  const [wrapperClassName, setWrapperClassName] = useState('ab-page__wrapper');

  const [breadcrumbNameMap, setBreadcrumbNameMap] = useState({
    '/dashboard': 'Панель управления',
    '/dashboard/employees': 'Сотрудники',
    '/dashboard/:datetable': 'Расписание',
    '/dashboard/services': 'Услуги',
    '/dashboard/profile': 'Профиль',
    '/dashboard/settings': 'Настройки',
    '/dashboard/clients': 'Клиенты',
  });

  const handleEmployeeData = (employee) => {
    setBreadcrumbNameMap((prev) => ({
      ...prev,
      [`/dashboard/employees/${employee.id}`]: `${employee.first_name}`,
    }));
  };

  const handleServiceData = (service) => {
    setBreadcrumbNameMap((prev) => ({
      ...prev,
      [`/dashboard/services/${service.id}`]: `${service.name}`,
    }));
  };
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
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#001529',
          colorText: '#ffffff',
          colorTextPlaceholder: '#ffffff',
          colorLink: '#ffffff',
          fontFamily: `'Montserrat', 
				sans-serif`,
          colorBgElevated: '#002950',
          boxShadow: 'none',
          colorIcon: '#ffffff',
        },
      }}
      locale={ruRU}>
      <CalendarProvider>
        {showAddAppointments && (
          <AddAppointments
            service={service}
            setService={setService}
            categories={categories}
            services={services}
          />
        )}

        {isAppointmentDetailsPage && <AppointmentDetails />}

        {!showAddAppointments && !isAppointmentDetailsPage && (
          <Layout style={{ height: '100%', background: '#001529' }}>
            <Sider trigger={null} collapsible collapsed={true}>
              {users ? (
                <Menu
                  theme="dark"
                  mode="inline"
                  onClick={({ key }) => {
                    if (key === 'signout') {
                      navigate('/');
                    } else if (key === 'services' || key === 'settings' || key === 'clients') {
                      navigate(`./${key}`);
                    } else if (key === 'dashboard') {
                      navigate(
                        `/dashboard/calendar?today=${stats.today}&range_start=${stats.rangeStart}`,
                      );
                    } else if (key === 'profile') {
                      // Предполагается, что id пользователя доступен в этом контексте
                      navigate(`./profile/${users.id}`);
                    } else {
                      // Предполагается, что все остальные ключи являются ID сотрудников
                      navigate(`./employees/${key}`);
                    }
                  }}>
                  <Link
                    to={`/dashboard/calendar?today=${stats.today}&range_start=${stats.rangeStart}`}>
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
                  <Menu.Item key="dashboard" icon=<CalendarOutlined />>
                    <Link
                      to={`/dashboard/calendar?today=${stats.today}&range_start=${stats.rangeStart}`}>
                      Календарь
                    </Link>
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
                  {users && (
                    <Menu.Item key="profile" icon={<IdcardOutlined />}>
                      <Link to={`profile/${users.id}`}>Личный кабинет</Link>
                    </Menu.Item>
                  )}
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
            <Layout className={layoutClassName} style={{ background: '#001529' }}>
              <Content
                className={wrapperClassName}
                style={{
                  margin: '0 16px',
                }}>
                <Header
                  className="eb-calendar_title"
                  style={{
                    padding: 0,
                  }}>
                  {['/dashboard/services', '/dashboard/clients'].includes(location.pathname) && (
                    <Dropdown menu={menuProps}>
                      <Button>
                        <Space>Оперции с Excel</Space>
                      </Button>
                    </Dropdown>
                  )}
                </Header>
                <Breadcrumbs breadcrumbNameMap={breadcrumbNameMap} />

                <Routes>
                  <Route path="/">
                    <Route index element={<DashboardMain />} />
                    <Route path="appointments/:eventId" element={<AppointmentDetails />} />
                    <Route path="employees/">
                      <Route index element={<Employees />} />
                      <Route
                        path=":id"
                        element={<EmployeesPersona onEmployeeData={handleEmployeeData} />}
                      />
                    </Route>
                    <Route path="clients" element={<Clients />} />
                    <Route path="calendar" element={<CalendarDay />} />
                    <Route path="services" element={<ServicesManagement />} />
                    <Route path="settings/">
                      <Route index element={<Settings />} />
                      <Route path="company" element={<Company />} />
                      <Route path="services/">
                        <Route index element={<Services />} />
                        <Route
                          path=":id"
                          element={<ServicePage onServiceData={handleServiceData} />}
                        />
                        <Route path='add' element={<ServiceAdd />} />
                      </Route>

                      <Route path="general" element={<Company />} />
                      <Route path="service-record" element={<Company />} />
                      <Route path="employees" element={<Company />} />
                    </Route>

                    <Route path="profile/:id">
                      <Route index element={<PersonalInfoDashboard />} />
                      <Route path="edit" element={<PersonalEdit />} />
                    </Route>
                  </Route>
                </Routes>
              </Content>
              {showSider && (
                <Sider className="eb-calendar-page__aside" style={{ maxWidth: '375px' }}>
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
        )}
      </CalendarProvider>
    </ConfigProvider>
  );
};

export default Dashboard;
