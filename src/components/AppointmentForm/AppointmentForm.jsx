import React, { useState } from 'react';

const AppointmentForm = () => {
  // Здесь будем хранить состояние формы
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    car: '',
    message: '',
  });

  // Обработчик изменения полей формы
  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <div className="appointment-form">
      <form onSubmit={handleSubmit}>
        <form>
          <div className="form-group">
            <label htmlFor="name">Имя:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Телефон:</label>
            <input type="tel" id="phone" name="phone" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="service">Услуга:</label>
            <select id="service" name="service" required>
              <option value="">Выберите услугу</option>
              <option value="1">Мойка кузова</option>
              <option value="2">Мойка салона</option>
              <option value="3">Полировка</option>
              <option value="4">Химчистка</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Дата:</label>
            <input type="date" id="date" name="date" required />
          </div>
          <div className="form-group">
            <label htmlFor="time">Время:</label>
            <input type="time" id="time" name="time" required />
          </div>
          <button className="btn-form" type="submit">
            Записаться
          </button>
        </form>
      </form>
    </div>
  );
};

export default AppointmentForm;
