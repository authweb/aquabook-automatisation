import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AppointmentDetails = () => {
  const { eventId } = useParams();

  useEffect(() => {
    // Устанавливаем новый заголовок страницы, включая eventId
    document.title = `AquaBook - Запись #${eventId}`;
  }, [eventId]); // Эффект будет перезапускаться каждый раз, когда изменяется eventId

  // Здесь вы можете добавить логику для загрузки данных события по eventId

  return <div style={{ color: '#fff' }}>Детали записи {eventId}</div>;
};

export default AppointmentDetails;
