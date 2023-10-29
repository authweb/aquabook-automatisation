import React, { useState } from 'react';

const Input = ({ typein, namein, autoCompletein, requiredin, idin, prefixin }) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleBlur = (event) => {
    setIsFilled(event.target.value !== '');
  };

  return (
    <>
      <label
        htmlFor={idin}
        className={`flex ab-text-field is-text ${isFilled ? 'is-filled' : ''} has-label`}>
        <div className="relative w-full">
          <input
            type={typein}
            name={namein}
            autoComplete={autoCompletein}
            required={requiredin}
            className="ab-text-field__element p-3"
            id={idin}
            onBlur={handleBlur}
          />
          <div className="ab-text-field__label ab-text-field__label">{prefixin}</div>
        </div>
      </label>
    </>
  );
};

export default Input;
