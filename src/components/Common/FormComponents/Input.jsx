import React, { useState } from 'react';

const Input = ({
  id,
  prefix,
  type,
  name,
  onChange,
  value,
  placeholder,
  createPlaceholder,
  autoComplete,
  required,
  iconGroup,
  iconOne,
  iconTwo,
  colsSpan,
}) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleBlur = (event) => {
    setIsFilled(event.target.value !== '');
  };

  return (
    <label
      htmlFor={id}
      className={`flex ${colsSpan} ab-text-field is-text ${isFilled ? 'is-filled' : ''} has-label`}>
      <div className="relative w-full">
        <input
          type={type}
          name={name}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          create-placeholder={createPlaceholder}
          required={required}
          className="ab-text-field__element p-3"
          id={id}
          onChange={onChange}
          onBlur={handleBlur}
        />
        <div className="ab-text-field__label ab-text-field__label">{prefix}</div>
        {iconGroup && (
          <span className="ab-text-field__icon">
            <button className="ab-button h-full ab-button_md color-accent theme-icon">
              <span className="ab-button__overlay"></span>
              <span className="ab-button__content ab-button__content_md">
                <span className="ab-button__text">{iconOne}</span>
              </span>
            </button>
            <button className="ab-button h-full ab-button_md color-accent theme-icon">
              <span className="ab-button__overlay"></span>
              <span className="ab-button__content ab-button__content_md">
                <span className="ab-button__text">{iconTwo}</span>
              </span>
            </button>
          </span>
        )}
      </div>
    </label>
  );
};

export default Input;
