import React, { useState } from 'react';

const TextArea = ({
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
  colsSpan,
}) => {
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBlur = (event) => {
    setIsFilled(event.target.value !== '');
  };

  const isValueFilled = value !== '';

  return (
    <div className="grid grid-cols-1 gap-6 items-start">
      <div
        htmlFor={id}
        className={`ab-text-field is-textarea ${
          isFocused || isFilled ? 'is-filled' : ''
        } has-label`}>
        <textarea
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
          style={{ overflow: 'hidden', overflowWrap: 'break-word', resize: 'none', height: '72px' }}
        />
        <div className="ab-text-field__label">{prefix}</div>
      </div>
    </div>
  );
};

export default TextArea;
