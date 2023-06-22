import React from 'react';
import '../../scss/homepage.scss'; // добавляем импорт стилей
import { Header, Main } from '../../components';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="container">
        <Header />
        <Main />
      </div>
    </div>
  );
};
export default HomePage;
