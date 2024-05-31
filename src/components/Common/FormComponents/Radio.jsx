import React, { useState, useEffect } from 'react';

const Radio = ({ type, name, id, prefix, value, checked, onChange }) => {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setIsFilled(checked);
  }, [checked]);

  const handleBlur = (event) => {
    setIsFilled(event.target.value !== '');
  };

  return (
    <>
      <div className="ab-flow__child">
        <div className={`ab-switch-field is-radio ${isFilled ? 'is-filled' : ''}`}>
          <input
            type={type}
            name={name}
            className="ab-switch-field__element"
            value={value}
            id={id}
            checked={checked}
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
