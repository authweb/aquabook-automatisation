import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const Input = ({ id, prefix, name, onChange, value, autoComplete, required, colsSpan }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleFocus = () => {
    setIsFocused(false);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBlur = (event) => {
    setIsFilled(event.target.value !== '');
  };

  const isValueFilled = value !== '';

  return (
    <label
      htmlFor={`input-${id}`}
      className={`flex ${colsSpan} ab-text-field is-text is-filled
       has-label`}>
      <div className="relative w-full">
        <InputMask
          mask="+7 999 999 99 99"
          type="tel"
          name={name}
          autoComplete={autoComplete}
          required={required}
          className="ab-text-field__element p-3"
          id={`input-${id}`}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          alwaysShowMask={true}
        />
        <div className="ab-text-field__label ab-text-field__label">{prefix}</div>
      </div>
    </label>
  );
};

export default Input;
