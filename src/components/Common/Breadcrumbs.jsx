import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
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
  "/dashboard/clients": "Клиенты",
  "/dashboard/analytics": "Аналитика",
  "/dashboard/calendar": "Календарь"
};

const Breadcrumbs = () => {
  const location = useLocation();
  const params = useParams();
  const [breadcrumbNames, setBreadcrumbNames] = useState(breadcrumbNameMap);

  const fetchData = async (type, id) => {
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
      case 'profile':
        url = `https://api.aqua-book.ru/api/users/${id}`;
        break;
      default:
        return;
    }

    try {
      const response = await axios.get(url);
      const data = response.data;

      let name = '';
      switch (type) {
        case 'employees':
          name = `${data.first_name}`;
          break;
        case 'services':
          name = data.name;
          break;
        case 'clients':
          name = `${data.first_name}`;
          break;
        case 'users':
          name = `${data.first_name}`;
          break;
        default:
          break;
      }

      setBreadcrumbNames((prev) => ({
        ...prev,
        [`/dashboard/${type}/${id}`]: name,
      }));
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
    }
  };

  useEffect(() => {
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    if (pathSnippets.length > 2) {
      const type = pathSnippets[1];
      const id = pathSnippets[2];
      if (!breadcrumbNames[`/dashboard/${type}/${id}`]) {
        fetchData(type, id);
      }
    }
  }, [location.pathname, breadcrumbNames]);

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
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
