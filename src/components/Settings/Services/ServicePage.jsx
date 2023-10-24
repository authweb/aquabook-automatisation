import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { HeaderDashboard } from '../../../components';

const ServicePage = () => {
  let { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/services/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setService(data.service);
        });
    }
  }, [id]);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderDashboard showBack title={service.name} buttons="Редактировать" to="edit" />

      <div>
        <h1>Название услуги: {service.name}</h1>
        <p>Описание: {service.description}</p>
        <p>Цена от: {service.price_from}</p>
        <p>Цена до: {service.price_to}</p>
        <p>Теги: {service.tags}</p>
        <p>Длительность: {service.duration}</p>
      </div>
    </div>
  );
};

export default ServicePage;
