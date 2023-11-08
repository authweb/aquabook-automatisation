import React from 'react';
import '../../scss/homepage.scss'; // добавляем импорт стилей
import { Header, Main } from '../../components';
import Banner from '../../assets/images/banner.svg';

const HomePage = () => {
  return (
    <>
      <img
        src={Banner}
        alt="background"
        className="absolute w-full object-cover object-bottom video-block-app__bg"
      />
      <Header />
      <Main />
    </>
  );
};
export default HomePage;
