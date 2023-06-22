import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Collapse, Table } from 'antd';

const { Panel } = Collapse;

const ServicesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState({});

  useEffect(() => {
    const fetchCategoriesAndServices = async () => {
      const categoriesResponse = await axios.get('http://localhost:3001/api/service-categories');
      const servicesResponse = await axios.get('http://localhost:3001/api/services');

      setCategories(categoriesResponse.data.servicesCategories);
      setServices(servicesResponse.data.services);
    };

    fetchCategoriesAndServices();
  }, []);

  // Определяем столбцы для таблицы
  const columns = [
    {
      title: 'Название услуги',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Цена от',
      dataIndex: 'price-from',
      key: 'price-from',
    },
    {
      title: 'Цена до',
      dataIndex: 'price-to',
      key: 'price-to',
    },
  ];

  if (!categories || !services) {
    return <div>Loading...</div>;
  }

  return (
    <Collapse accordion>
      {categories.map((category) => (
        <Panel header={category.name} key={category.id}>
          {services[category.id] && (
            <Table dataSource={services[category.id]} columns={columns} rowKey="id" />
          )}
        </Panel>
      ))}
    </Collapse>
  );
};

export default ServicesManagement;
