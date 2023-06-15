import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'ФИО',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: '30%',
  },
  //   {
  //     title: 'Age',
  //     dataIndex: 'age',
  //     sorter: (a, b) => a.age - b.age,
  //   },
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
  //   {
  //     title: 'Address',
  //     dataIndex: 'address',
  //     filters: [
  //       {
  //         text: 'London',
  //         value: 'London',
  //       },
  //       {
  //         text: 'New York',
  //         value: 'New York',
  //       },
  //     ],
  //     onFilter: (value, record) => record.address.startsWith(value),
  //     filterSearch: true,
  //     width: '40%',
  //   },
];
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];

const Clients = () => {
  const [data, setData] = useState([]); // создаем состояние для данных

  useEffect(() => {
    fetch('http://localhost:3001/api/clients') // замените на ваш URL
      .then((response) => response.json())
      .then((data) => {
        setData(
          data.employees.map((client) => ({
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
