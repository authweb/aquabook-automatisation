import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import axios from 'axios';

const breadcrumbNameMap = {
  "/dashboard": "Панель управления",
  "/dashboard/employees": "Сотрудники",
  "/dashboard/:datetable": "Расписание",
  "/dashboard/services": "Услуги",
  "/dashboard/users": "Профиль",
  "/dashboard/settings": "Настройки",
  "/dashboard/settings/services": "Услуги",
  "/dashboard/settings/employees": "Сотрудники",
  "/dashboard/clients": "Клиенты",
  "/dashboard/analytics": "Аналитика",
  "/dashboard/calendar": "Календарь"
};

const fetchName = async (type, id) => {
  let url = '';
  switch (type) {
    case 'employees':
      url = `https://api.aqua-book.ru/api/employees/${id}`;
      break;
    case 'services':
      url = `https://api.aqua-book.ru/api/services/${id}`;
      break;
    case 'clients':
      url = `https://api.aqua-book.ru/api/clients/${id}`;
      break;
    case 'users':
      url = `https://api.aqua-book.ru/api/users/${id}`;
      break;
    default:
      return '';
  }

  try {
    const response = await axios.get(url);
    const data = response.data;

    let name = '';
    switch (type) {
      case 'employees':
        name = data.employee.first_name;
        break;
      case 'services':
        name = data.service.name;
        break;
      case 'clients':
        name = data.clients.first_name;
        break;
      case 'users':
        name = data.users.first_name;
        break;
      default:
        break;
    }
    return name;
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error);
    return '';
  }
};

const Breadcrumbs = () => {
  const location = useLocation();
  const [breadcrumbNames, setBreadcrumbNames] = useState(breadcrumbNameMap);

  useEffect(() => {
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const fetchAndSetName = async () => {
      if (pathSnippets.length > 2) {
        const type = pathSnippets[pathSnippets.length - 2];
        const id = pathSnippets[pathSnippets.length - 1];
        if (!breadcrumbNames[`${location.pathname}`]) {
          const name = await fetchName(type, id);
          setBreadcrumbNames(prev => ({
            ...prev,
            [`${location.pathname}`]: name,
          }));
        }
      }
    };

    fetchAndSetName();
  }, [location.pathname]);

  const extraBreadcrumbItems = location.pathname.split("/").filter((i) => i).map((_, index) => {
    const url = `/${location.pathname.split("/").filter((i) => i).slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNames[url] || url}
        </Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="dashboard"></Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <Breadcrumb
      className="eb-calendar__header eb-calendar__shadows"
      style={{ margin: "16px 0" }}>
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
