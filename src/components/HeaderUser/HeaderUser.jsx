import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const HeaderUser = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="headerUser">
      <div className="headerUser__box">
        {/* <MdArrowBackIos className="headerUser__box-icon" onClick={() => navigate(-1)} /> */}
      </div>
      <div className="headerUser__box">
        <h2 className="headerUser__box-title">{title}</h2>
      </div>
      <div className="headerUser__box">
        <div className="headerUser__box-space"></div>
      </div>
    </div>
  );
};

export default HeaderUser;
