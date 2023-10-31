import React, { useState } from 'react';

const Select = ({ typein, gender, idin, prefixin, parameter }) => {
  const [isSelect, setIsFilled] = useState(false);

  const handleBlur = (event) => {
    setIsFilled(event.target.value !== '');
  };

  return (
    <>
      <div className="ab-flow__child">
        <div className="ab-switch-field is-select">
          <input
            type={typein}
            name={gender}
            className="ab-switch-field__element"
            value={parameter}
            id={idin}
            onBlur={handleBlur}
          />
          <label htmlFor={idin} className="ab-switch-field__label">
            {prefixin}
          </label>
        </div>
      </div>
    </>
  );
};

export default Select;
