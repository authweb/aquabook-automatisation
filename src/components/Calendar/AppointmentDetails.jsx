import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { ReactComponent as TimeIcon } from '../../assets/images/time-icon.svg';
import { Tag } from 'antd';
import TextArea from '../Common/FormComponents/TextArea';

import { CalendarContext } from '../../contexts/CalendarContexts';
import HeaderDashboard from '../Common/HeaderDashboard';
import { ReactComponent as ServiceIcon } from '../../assets/images/service.svg';
import { ReactComponent as UserSvg } from '../../assets/images/tag-user.svg';
import CardEdit from '../Common/CardEdit';
import Aside from '../Common/Aside';

const AppointmentDetails = () => {
  const { currentEventId } = useContext(CalendarContext);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/appointments/${currentEventId}`,
        );
        setEventData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных события:', error);
        // здесь должна быть обработка ошибок
      }
    };

    if (currentEventId) {
      fetchEventData();
    }
  }, [currentEventId]);

  useEffect(() => {
    document.title = `AquaBook - Запись #${currentEventId}`;
  }, [currentEventId]);

  if (!eventData) {
    return <div style={{ color: '#fff' }}>Загрузка деталей события...</div>;
  }

  return (
    <>
      <div className="ab-page">
        <HeaderDashboard showBack title={`Запись #${currentEventId}`} containerSmall />
        <div className="ab-page__content">
          <div className="container-small">
            <div className="grid grid-cols-1 gap-8 items-start">
              <div className="ab-card eb-services-island">
                <h4 className="ab-sub-headline">Услуги</h4>
                <span className="ab-badge inline-flex items-center ml-2 inline align-baseline">
                  <span
                    className="ab-badge__text px-2"
                    style={{
                      backgroundColor: `rgba(var(--c-mono-800-rgb), var(--bg-opacity, 1))`,
                      color: `rgba(var(--c-on-mono-800-rgb), var(--text-opacity, 1))`,
                    }}>
                    1
                  </span>
                </span>
                <div className="eb-services-island__item">
                  <div className="eb-services-island__service">
                    <div className="flex items-center w-full w-max-full">
                      <div
                        className="eb-island-icon mr-4 flex-shrink-0 rounded-lg"
                        style={{ width: '50px', height: '50px' }}>
                        <ServiceIcon className="ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text" />
                      </div>
                      <div className="flex-grow pr-4 overflow-hidden">
                        Service
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs mt-1">
                          <div className="whitespace-no-wrap">11:30 - 12:00</div>
                          <div className="opacity-50 whitespace-no-wrap">30 мин.</div>
                          <div>
                            <div className="eb-user-avatar eb-user-avatar--single-row">
                              <span className="eb-user-avatar__title">Валерий</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <strong className="whitespace-no-wrap">5000 ₽</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                <dd>0 ₽</dd>
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
                  {/* <button className="ab-sub-headline">{formattedStart}</button> */}
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
                  }}
                  // onClick={addAppointment}
                >
                  <span className="eb-button__text">Оплата</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <CalendarNavigator /> */}
      </div>
    </>
  );
};

export default AppointmentDetails;