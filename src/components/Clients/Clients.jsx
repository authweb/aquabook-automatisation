import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'ФИО',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: '30%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '40%',
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    width: '40%',
  },
];

const Clients = () => {
  const [data, setData] = useState([]); // создаем состояние для данных

  useEffect(() => {
    fetch('http://localhost:3001/api/clients') // замените на ваш URL
      .then((response) => response.json())
      .then((data) => {
        setData(
          data.clients.map((client) => ({
            // преобразуем данные в нужный формат
            key: client.id,
            name: `${client.first_name} ${client.last_name}`,
            email: client.email, // замените на реальные данные, если они есть
            phone: client.phone, // замените на реальные данные, если они есть
          })),
        );
      });
  }, []);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default Clients;
