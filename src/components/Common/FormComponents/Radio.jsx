import React, { useState } from 'react';

const Radio = ({ type, name, id, prefix, value, onChange }) => {
  const [isRadio, setIsFilled] = useState(false);

  const handleBlur = (event) => {
    setIsFilled(event.target.value !== '');
  };

  return (
    <>
      <div className="ab-flow__child">
        <div className="ab-switch-field is-radio">
          <input
            type={type}
            name={name}
            className="ab-switch-field__element"
            value={value}
            id={id}
            onChange={onChange}
            onBlur={handleBlur}
          />
          <label htmlFor={id} className="ab-switch-field__label">
            {prefix}
          </label>
        </div>
      </div>
    </>
  );
};

export default Radio;
