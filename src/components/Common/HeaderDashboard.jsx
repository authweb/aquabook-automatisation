import React from 'react';
import { CaretLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const HeaderUser = ({ showBack, title, buttons, to }) => {
  const navigate = useNavigate();

  return (
    <div className="ab-page__heading">
      <div className="ab-page-headline">
        <div className="ab-page-headline__container container">
          {showBack && (
            <div className="ab-page-headline__back-wrapper mr-4">
              <span
                className="ab-button w-10 h-10 ab-page-headline__back cursor-pointer"
                onClick={() => navigate(-1)}>
                <span className="ab-button__overlay"></span>
                <span className="ab-button__content ab-button__content_md px-2">
                  <CaretLeftOutlined />
                </span>
              </span>
            </div>
          )}
          {title && <h1 className="ab-headline ab-page-headline__heading">{title}</h1>}
          <div className="ab-page-headline__buttons">
            <div className="ab-page-menu-button">
              {to && (
                <Link to={to} className="ab-button">
                  <span className="ab-button__content">
                    <span className="ab-button__text">{buttons}</span>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* <div className="headerUser__box">
        <MdArrowBackIos className="headerUser__box-icon" onClick={() => navigate(-1)} />
      </div> */}
      </div>
    </div>
  );
};

export default HeaderUser;
