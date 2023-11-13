import React, { useState, useEffect } from 'react';
import HeaderDashboard from '../Common/HeaderDashboard';
import CardEdit from '../Common/CardEdit';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { Layout, Tag } from 'antd';
import Aside from '../Common/Aside';
import { ReactComponent as TimeIcon } from '../../assets/images/time-icon.svg';
import TextArea from '../Common/FormComponents/TextArea';

const AddAppointments = ({ service, setService, categories, services, serviceId }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const endString = queryParams.get('end');
  const [startDate, setStartDate] = useState(
    dayjs(queryParams.get('start'), 'YYYY-MM-DDTHH:mm:ss'),
  );
  const endDate = dayjs(endString, 'YYYY-MM-DDTHH:mm:ss');
  const [initialStartDate, setInitialStartDate] = useState(
    dayjs(queryParams.get('start'), 'YYYY-MM-DDTHH:mm:ss'),
  );
  const formattedStart = initialStartDate.format('dd, DD MMM YYYY HH:mm');

  const formattedEnd = endDate.format('dd, DD MMM YYYY HH:mm');
  const [activeButton, setActiveButton] = useState(null);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceEmployeeMap, setServiceEmployeeMap] = useState(new Map());
  const [tempIdMap, setTempIdMap] = useState(new Map());
  const [serviceIdCounter, setServiceIdCounter] = useState(0);
  const [currentValues, setCurrentValues] = useState('');

  useEffect(() => {
    const totalCost = selectedServices.reduce(
      (total, service) => total + Number(service.priceFrom),
      0,
    );

    setCurrentValues({ cost: totalCost });
  }, [selectedServices]);

  const addService = (service, tempId) => {
    const newServiceId = serviceIdCounter;
    setServiceIdCounter((prevId) => prevId + 1);
    console.log(tempId);
    const endTime = dayjs(startDate).add(service.duration, 'minute');
    const serviceWithTimeAndId = {
      ...service,
      id: newServiceId,
      startTime: startDate.format('HH:mm'),
      endTime: endTime.format('HH:mm'),
    };
    console.log(`addService: tempId = ${tempId}, newServiceId = ${newServiceId}`);
    setTempIdMap((prevMap) => {
      const tempIdMap = new Map(prevMap);
      tempIdMap.set(tempId, newServiceId);
      return tempIdMap;
    });
    setSelectedServices((prevServices) => [...prevServices, serviceWithTimeAndId]);
    setStartDate(endTime);
    console.log('newServiceId: ', newServiceId);

    // handleSelectEmployeeForService(newServiceId, employee);
  };

  const handleSelectEmployeeForService = (tempId, employee) => {
    setServiceEmployeeMap((prev) => {
      console.log(`handleSelectEmployeeForService: received tempId = ${tempId}`);
      const originalServiceId = tempIdMap.get(tempId);
      console.log('originalServiceId: ', originalServiceId);
      const updatedMap = new Map(prev);
      updatedMap.set(originalServiceId, employee);
      console.log(updatedMap); // Логирование обновленной карты

      return updatedMap;
    });
  };

  useEffect(() => {
    console.log('Обновленный tempIdMap:', tempIdMap);
  }, [tempIdMap]);

  const openAside = (asideName) => {
    setActiveButton(asideName);
    setIsAsideOpen(true);
  };

  const closeAside = () => {
    setActiveButton(null);
    setIsAsideOpen(false);
  };

  return (
    <>
      <div className="ab-page">
        <HeaderDashboard showBack title="Новая запись" containerSmall />
        <div className="ab-page__content">
          <div className="container-small">
            <div className="grid grid-cols-1 gap-8 items-start">
              <CardEdit
                title="Услуга"
                setActiveButton={setActiveButton}
                cardCalendar
                setSelectedServices={setSelectedServices}
                selectedServices={selectedServices}
                ButtonName="Добавить услугу"
                serviceEmployeeMap={serviceEmployeeMap}
                onButtonClick={() => openAside('service')}></CardEdit>
              <CardEdit
                title="Клиент"
                setActiveButton={setActiveButton}
                cardClient
                ButtonName="Создать нового"
                onButtonClick={() => openAside('client')}></CardEdit>
            </div>
            {activeButton === 'service' && (
              <Aside
                title="Добавить услугу"
                closeAside={closeAside}
                isAsideOpen={isAsideOpen}
                onAddService={addService}
                onSelectEmployeeForService={handleSelectEmployeeForService}
              />
            )}
            {activeButton === 'client' && (
              <Aside title="Добавить клиента" closeAside={closeAside} isAsideOpen={isAsideOpen} />
            )}
          </div>
        </div>
      </div>
      <div className="eb-page-aside__aside">
        <div className="eb-page-aside__content">
          <div className="grid grid-cols-1 gap-4 items-start">
            <div className="eb-booking-invoice">
              <h3 className="ab-headline">Итого</h3>
              <dl className="eb-booking-invoice__list">
                <dt>Сумма к оплате</dt>
                <dd>{currentValues.cost} ₽</dd>
              </dl>
            </div>
            <div className="eb-booking-comlete mb-6">
              <div
                className="eb-booking-complete__card bg-mono-900 eb-booking-complete__card--default"
                style={{ textAlign: 'center', borderRadius: '0.625rem' }}>
                <span className="eb-booking-complete__icon eb-booking-complete__icon--default">
                  <TimeIcon />
                </span>
                <div className="-mt-2">
                  <button className="ab-sub-headline">{formattedStart}</button>
                </div>
                <span className="ab-chip-select inline-flex text-left">
                  <button className="focus-outline">
                    <div className="pl-1 py-1">
                      <div className="whitespace-no-wrap leading-none relative inline-block rounded-lg bg-surface text-xs">
                        <Tag
                          color="cyan"
                          className="relative inline-flex items-center leading-5 px-2 rounded-lg">
                          Новая запись
                        </Tag>
                      </div>
                    </div>
                  </button>
                </span>
              </div>
            </div>
            <div>
              <div className="lg:mb-auto grid grid-cols-1 gap-6 items-start">
                <TextArea name="comment" prefix="Комментарий" id="input-55" />
              </div>
            </div>
          </div>
        </div>
        {selectedServices.length > 0 && (
          <div className="eb-page-aside__buttons">
            <div className="ab-model-edit">
              <div className="ab-model-edit__panel">
                <div className="ab-modal-buttons ab-modal-buttons--desktop">
                  <button
                    className="eb-button ab-modal-buttons__button eb-button--color-accent w-full"
                    style={{
                      '--btn-bg': 'var(--c-success-rgb)',
                      '--btn-fg': 'var(--c-on-accent-rgb)',
                      '--btn-size': '3.5rem',
                      '--btn-radius': '0.625rem',
                      '--btn-icon-bg': '0.15',
                    }}>
                    <span className="eb-button__text">Создать запись</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <CalendarNavigator /> */}
      </div>
    </>
  );
};

export default AddAppointments;
