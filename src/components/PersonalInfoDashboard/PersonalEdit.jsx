import React from 'react';

import { HeaderDashboard, CardEdit } from '../';

import { Input } from '..';

const PersonalEdit = () => {
  return (
    <>
      <HeaderDashboard showBack titleProfile containerSmall />
      <div className="ab-page__content">
        <div className="container-small">
          <div>
            <div className="grid grid-cols-1 gap-4 items-start">
              <CardEdit general="Общая информация" switcher>
                <Input
                  typein="text"
                  namein="first_name"
                  autoCompletein="first_name"
                  requiredin="required"
                  idin="input-35"
                  prefixin="Имя"
                />
                <Input
                  typein="text"
                  namein="last_name"
                  autoCompletein="last_name"
                  idin="input-36"
                  prefixin="Фамилия"
                />
                <Input
                  typein="email"
                  namein="email"
                  autoCompletein="email"
                  idin="input-37"
                  prefixin="Email"
                />
                <Input
                  typein="tel"
                  namein="phone"
                  autoCompletein="tel"
                  requiredin="required"
                  idin="input-38"
                  prefixin="Телефон"
                />
                <Input
                  typein="text"
                  namein="position"
                  autoCompletein="position"
                  idin="input-39"
                  prefixin="Должность"
                />
              </CardEdit>
              <CardEdit />
              <CardEdit />
              <CardEdit />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalEdit;
