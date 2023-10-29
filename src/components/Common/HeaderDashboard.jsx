import React from 'react';
import { CaretLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContexts';

const HeaderUser = ({ showBack, title, titleProfile, buttons, to, containerSmall }) => {
  const navigate = useNavigate();
  const { users, setUsers } = useAuth();
  return (
    <div className="ab-page__heading">
      <div className="ab-page-headline">
        {showBack && (
          <div className="ab-page-headline__back-wrapper">
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
        <div
          className={
            containerSmall
              ? 'ab-page-headline__container container-small'
              : 'ab-page-headline__container container'
          }>
          {titleProfile && (
            <h1 className="ab-headline ab-page-headline__heading">
              {users.first_name} {users.last_name}
            </h1>
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
        <div className="flex-1"></div>
        {/* <div className="headerUser__box">
        <MdArrowBackIos className="headerUser__box-icon" onClick={() => navigate(-1)} />
      </div> */}
      </div>
    </div>
  );
};

export default HeaderUser;
