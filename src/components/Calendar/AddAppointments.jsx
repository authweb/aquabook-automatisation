import React, { useState } from 'react';
import HeaderDashboard from '../Common/HeaderDashboard';
import CardEdit from '../Common/CardEdit';
import { Layout } from 'antd';
import Aside from '../Common/Aside';
const { Sider, Select } = Layout;
const AddAppointments = ({ service, setService, categories, services }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const openAside = (asideName) => {
    setActiveButton(asideName);
    setIsAsideOpen(true);
  };

  const closeAside = () => {
    setActiveButton(null);
    setIsAsideOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="ab-page">
      <HeaderDashboard showBack title="Новая запись" containerSmall />
      <div className="ab-page__content">
        <div className="container-small">
          <div className="grid grid-cols-1 gap-8 items-start">
            <CardEdit
              title="Услуга"
              setActiveButton={setActiveButton}
              cardCalendar
              ButtonName="Добавить услугу"
              onButtonClick={() => openAside('service')}></CardEdit>
            <CardEdit
              title="Клиент"
              setActiveButton={setActiveButton}
              cardClient
              ButtonName="Создать нового"
              onButtonClick={() => openAside('client')}></CardEdit>
          </div>
          {activeButton === 'service' && (
            <Aside title="Добавить услугу" closeAside={closeAside} isAsideOpen={isAsideOpen} />
          )}
          {activeButton === 'client' && (
            <Aside title="Добавить клиента" closeAside={closeAside} isAsideOpen={isAsideOpen} />
          )}
        </div>
      </div>
      <Sider className="eb-page-aside__aside" style={{ maxWidth: '375px' }}>
        <div className="eb-page-aside__content">
          <div className="grid grid-cols-1 gap-4 items-start">
            <div className="eb-booking-invoice">
              <h3 className="ab-headline">Итого</h3>
              <dl className="eb-booking-invoice__list">
                <dt>Сумма к оплате</dt>
                <dd>0 ₽</dd>
              </dl>
            </div>
            <div className="eb-booking-comlete mb-6">
              <span className="eb-booking-complete__icon eb-booking-complete__icon--default"></span>
              <div className="-mt-2">
                <button className="ab-sub-headline"></button>
              </div>
            </div>
          </div>
        </div>
        <div className="eb-page-aside__buttons"></div>
        {/* <CalendarNavigator /> */}
      </Sider>
    </div>
  );
};

export default AddAppointments;
