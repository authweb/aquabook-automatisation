import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";

const columns = [
  {
    title: "ФИО",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: "30%",
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "40%",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    width: "40%",
  },
];

const Clients = () => {
  const [data, setData] = useState([]); // данные клиентов
  const [searchText, setSearchText] = useState(""); // поисковый запрос

  useEffect(() => {
    // Здесь предполагается, что ваш API поддерживает CORS
    fetch("http://localhost:3001/api/clients")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.clients.map((client) => ({
          key: client.id,
          name: `${client.first_name} ${client.last_name}`,
          email: client.email,
          phone: client.phone,
        }));
        setData(formattedData);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchText.toLowerCase())
  );

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Input
        placeholder="Введите ФИО, Email или Телефон"
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={filteredData} onChange={onChange} />
    </div>
  );
};

export default Clients;
