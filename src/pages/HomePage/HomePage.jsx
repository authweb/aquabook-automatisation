import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/homepage.scss'; // добавляем импорт стилей
import { Header } from '../../components';

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <h1>Автоматизируй работу автомойки</h1>
      <p>
        Мы предоставляем профессиональные услуги по чистке автомобилей. Наши услуги включают в себя
        экстерьер и интерьер очистка, детализация и многое другое. Запишитесь на прием прямо сейчас
        и наши специалисты почистят ваш автомобиль.
      </p>
      <Link to="/appointment">
        <button>Записаться</button>
      </Link>
    </div>
  );
};
export default HomePage;
