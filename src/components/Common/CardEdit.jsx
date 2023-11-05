import React from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import { CheckOutlined, CloseOutlined, PlusOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

const CardEdit = ({
  general,
  switcher,
  children,
  cardCalendar,
  cardEdit,
  cardClient,
  addService,
  addClient,
}) => {
  const { users, setUsers } = useAuth();
  return (
    <>
      {cardCalendar && (
        <div className="ab-card eb-services-island">
          <h4 className="ab-sub-headline">{general}</h4>
          <button className="ab-button w-full mt-4 eb-button-dashed ab-button_md color-accent theme-outline">
            <span className="ab-button__overlay"></span>
            <span className="ab-button__content ab-button__content_md">
              <PlusOutlined style={{ color: '#ff7a00' }} />
              <span className="ab-button__text ml-1">{addService}</span>
            </span>
          </button>
        </div>
      )}
      {cardClient && (
        <div className="ab-card">
          <div className="flex mb-4">
            <h4 className="ab-sub-headline mr-auto">{general}</h4>
            <button type="button" className="link-uppercase ml-4 link">
              {addClient}
            </button>
          </div>
          <div>
            <div className="ab-select eb-select-white-prefix" placeholder="Не выбран (Анонимный)">
              <div className="ab-select__input-wrap">
                <label htmlFor="input-56" className="flex flex-1 ab-text-field is-text has-icon">
                  <div className="ab-text-field__prefix">
                    <UserSwitchOutlined width={30} height={30} className="ml-3" />
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="input-56"
                      autoComplete="off"
                      placeholder="Не выбран (Анонимный)"
                      className="ab-text-field__element p-3"
                    />
                    <span className="ab-text-field__icon"></span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      {cardEdit && (
        <section className="ab-card ab-island">
          <div role="button" className="ab-island__heading">
            <div className="ab-island__title-wrap">
              <h3 className="ab_headline ab-island__title">{general}</h3>
            </div>
            {/* <div className="ab-island__description">
            <div className="ab-description">Повелитель</div>
          </div> */}
            <div className="ab-island__arrow-wrap">
              <div className="whitespace-no-wrap leading-none relative inline-block rounded-lg text-xs">
                {switcher && (
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                  />
                )}
              </div>
            </div>
          </div>
          <div className="ab-island__content-wrap">
            <div className="ab-island__content">
              <div className="grid grid-cols-1 gap-4 items-start">{children}</div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CardEdit;
