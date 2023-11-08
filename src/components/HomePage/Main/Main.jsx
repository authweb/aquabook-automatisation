import React from 'react';
import { Link } from 'react-router-dom';
import '../../../scss/homepage.scss';

import Dashboard from '../../../assets/images/dashboard.svg';

const Main = () => {
  return (
    <div className="container md:flex items-center relative">
      <div className="w-full mb-6 md:mb-0 md:w-1/2 md:order-last video-block-app__app">
        <img src={Dashboard} alt="dashboard" />
      </div>
      <div className="w-full md:w-1/2 md:pr-12 flex flex-col md:block color-light">
        <h1 className="font-montserrat text-h1">Автоматизируй работу автомойки</h1>
        <p className="mt-8 md:mt-3 md:text-xl font-light leading-relaxed order-last md:order-none">
          Мы предоставляем профессиональные услуги по чистке автомобилей. Наши услуги включают в
          себя экстерьер и интерьер очистка, детализация и многое другое. Запишитесь на прием прямо
          сейчас и наши специалисты почистят ваш автомобиль.
        </p>
        <div className="flex -mx-2 md:mt-5 flex-wrap">
          <div className="px-2 flex-1 mt-5">
            <Link to="/register" className="btn-hp block w-full">
              <span className="btn-hp__content btn-hp__content--btn rounded-10 border-2 flex items-center justify-center whitespace-no-wrap w-full py-5 px-8 min-w-200 btn-hp--primary btn-hp--solid">
                <span>Регистрация</span>
              </span>
            </Link>
          </div>
          <div className="px-2 flex-1 mt-5">
            <Link to="/features" className="btn-hp block w-full">
              <span className="btn-hp__content btn-hp__content--btn rounded-10 border-2 flex items-center justify-center whitespace-no-wrap w-full py-5 px-8 min-w-200 btn-hp--primary btn-hp--outline">
                <span>Функции</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
