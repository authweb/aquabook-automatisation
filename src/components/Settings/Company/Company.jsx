import React from 'react';
import { useAuth } from '../../../contexts/AuthContexts';

import { HeaderDashboard, CardAb } from '../../../components';
import '../../../scss/profile.scss';

import Logo from '../../../assets/images/Logo.png';

const Company = () => {
  const { users } = useAuth();

  return (
    <>
      <HeaderDashboard showBack title="Компания" buttons="Редактировать" to="edit" />
      <div className="ab-page__content">
        <div className="container ab-page__grid">
          <div>
            <section className="ab-card ab-island">
              <div role="button" className="ab-island__heading">
                <div className="ab-island__icon-wrap">
                  <div className="ab-island-avatar__icon">
                    <span className="ab-avatar ab-island-avatar__icon-userpic">
                      <img src={Logo} alt="" />
                    </span>
                  </div>
                </div>
                <div className="ab-island__title-wrap">
                  <h3 className="ab_headline ab-island__title">AQUALORD Detailing</h3>
                </div>
                <div className="ab-island__description">
                  <div className="ab-description">Детейлинг</div>
                </div>
                {/* <p className="personalInfo__flex__pcol-p"></p>
            <p className="personalInfo__flex__pcol-p">{users?.email}</p>
            <p className="personalInfo__flex__pcol-p">{users?.phone}</p> */}
              </div>
              <div className="ab-island__content-wrap">
                <hr className="ab-island-avatar__separator" />
                <div className="ab-island__content">
                  <div className="grid grid-cols-1 gap-4 items-start">
                    <div className="ab-info">
                      <div className="ab-info__label">
                        <span className="ab-description">Телефон</span>
                      </div>
                      <div>
                        <span className="descinfo">
                          <a target="_blank" href="tel://+79504110511" className="link">
                            +79504110511
                          </a>
                        </span>
                      </div>
                    </div>
                    <div className="ab-info">
                      <div className="ab-info__label">
                        <span className="ab-description">Whatsapp</span>
                      </div>
                      <div>—</div>
                    </div>
                    <div className="ab-info">
                      <div className="ab-info__label">
                        <span className="ab-description">Viber</span>
                      </div>
                      <div>—</div>
                    </div>
                    <div className="ab-info">
                      <div className="ab-info__label">
                        <span className="ab-description">Telegram</span>
                      </div>
                      <div>—</div>
                    </div>
                    <div className="ab-info">
                      <div className="ab-info__label">
                        <span className="ab-description">YouTube</span>
                      </div>
                      <div>—</div>
                    </div>
                    <div className="ab-info">
                      <div className="ab-info__label">
                        <span className="ab-description">Вконтакте</span>
                      </div>
                      <div>—</div>
                    </div>
                    <div className="ab-info">
                      <div className="ab-info__label">
                        <span className="ab-description">Тип компании</span>
                      </div>
                      <div>Детейлинг</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div>
            <CardAb arrow title="Вопросы / ответы" to="faq" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
