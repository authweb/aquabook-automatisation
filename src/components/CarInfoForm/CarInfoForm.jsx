import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContexts';

const CarInfoForm = () => {
  const { clients, updateCarInfo } = useAuth();
  const [carNumber, setCarNumber] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carType, setCarType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Отправляем данные на сервер
      const response = await axios.post('/api/updatecarinfo', {
        clients_id: clients.id,
        car_number: carNumber,
        car_make: carMake,
        car_model: carModel,
        car_type: carType,
      });

      // Обновляем информацию о машине клиента
      updateCarInfo({
        clients_id: clients.id,
        car_number: carNumber,
        car_make: carMake,
        car_model: carModel,
        car_type: carType,
      });

      // Очищаем поля формы
      setCarNumber('');
      setCarMake('');
      setCarModel('');
      setCarType('');

      console.log('Car info updated:', response.data.carInfo);
    } catch (error) {
      console.error('Error updating car info:', error);
    }
  };

  return (
    <div className="car-info">
      <h2>Информация о машине</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Номер машины:
          <input
            type="text"
            id="car_number"
            name="car_number"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
          />
        </label>
        <label>
          Марка машины:
          <input
            type="text"
            id="car_make"
            name="car_make"
            value={carMake}
            onChange={(e) => setCarMake(e.target.value)}
          />
        </label>
        <label>
          Модель машины:
          <input
            type="text"
            id="car_model"
            name="car_model"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
          />
        </label>
        <label>
          Тип машины:
          <input
            type="text"
            id="car_type"
            name="car_type"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
          />
        </label>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default CarInfoForm;
