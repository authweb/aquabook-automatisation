import React, { useState } from 'react';
import { ReactComponent as Close } from '../../assets/images/close.svg';

const Aside = ({ title, closeAside, isAsideOpen }) => {
  return (
    <aside
      role="dialog"
      aria-hidden={!isAsideOpen}
      aria-label="Добавить услугу"
      className={`ab-modal is-overlay-aside ${
        isAsideOpen
          ? 'modal-transition-overlay-aside-enter-active modal-transition-overlay-aside-enter-to'
          : 'modal-transition-overlay-aside-leave-active modal-transition-overlay-aside-leave-to'
      }`}>
      <div className="ab-modal__container">
        <div role="document" className="ab-modal__dialog">
          <div className="ab-modal__header flex justify-space">
            <div className="ab-modal__title ">{title}</div>
            <button
              type="button"
              title="Закрыть"
              aria-label="Закрыть"
              tabIndex="0"
              className="ab-button ab-button_md color-default theme-ghost ab-modal__close"
              onClick={closeAside}>
              <span className="ab-button__overlay"></span>
              <span
                className="ab-button__content ab-button__content_md p-2 relative"
                style={{ top: '-12px', right: '16px' }}>
                <Close width={15} height={15} />
              </span>
            </button>
          </div>
          <div className="ab-modal__body">
            <div className="ab-modal__content ab-modal__content--buttons">
              <div className="grid grid-cols-1 gap-6 items-start">
                <div className="grid grid-cols-1 gap-6 items-start">
                  <div>
                    <div className="ab-select eb-select-white-prefix">
                      <div className="ab-select__input-wrap">
                        <label
                          htmlFor="input-56"
                          className="flex-flex-1 ab-text-field is-text has-label has-icon">
                          <div className="ab-text-field__prefix"></div>
                          <div className="relative w-full">
                            <input
                              type="text"
                              id="input-56"
                              className="ab-text-field__element p-3"
                            />
                            <div className="ab-text-field__label">Услуга</div>
                            <span className="ab-text-field__icon">
                              <button className="ab-button h-full ab-button_md color-accent theme-icon">
                                <span className="ab-button__overlay"></span>
                                <span className="ab-button__content ab-button__content_md"></span>
                              </button>
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                    <span className="ab-description block mt-2"></span>
                  </div>
                </div>
                <div className="ab-select eb-select-white-prefix"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
