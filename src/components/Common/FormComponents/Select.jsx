import React, { useState, useEffect, useRef } from 'react';

import { ReactComponent as DropArrow } from '../../../assets/images/droparrow.svg';

const Select = ({
  options,
  renderOption,
  getDisplayValue,
  filterFunction,
  description,
  inputTitle,
  onSelect,
  prefixSvg,
  selectedValue,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (selectedValue) {
      setSelectedOption(getDisplayValue(selectedValue));
    }
  }, [selectedValue, getDisplayValue]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(getDisplayValue(option));
    onSelect(option);
    setDropdownVisible(false);
  };

  const filteredOptions = options.filter((option) => filterFunction(option, searchTerm));

  return (
    <>
      <div>
        <div className="ab-select eb-select-white-prefix">
          <div className="ab-select__input-wrap" onClick={toggleDropdown}>
            <label
              htmlFor="input-56"
              className={`flex flex-1 ab-text-field is-text has-label has-icon ${
                isFocused || selectedOption || searchTerm ? 'is-filled' : ''
              }`}>
                {prefixSvg && (<div className="ab-text-field__prefix">
                <div className="eb-island-icon ml-4 rounded-md">{prefixSvg}</div>
              </div>)}
              <div className="relative w-full">
                <input
                  type="text"
                  id="input-56"
                  className="ab-text-field__element p-3"
                  value={selectedOption ? selectedOption : searchTerm}
                  onBlur={handleBlur}
                  onChange={handleSearchChange}
                  onFocus={() => setDropdownVisible(true)}
                />
                <div className="ab-text-field__label">{inputTitle}</div>
                <span className="ab-text-field__icon">
                  <button className="ab-button h-full ab-button_md color-accent theme-icon">
                    <span className="ab-button__overlay"></span>
                    <span className="ab-button__content ab-button__content_md">
                      <span className="ab-button__text">
                        <DropArrow className="ab-icon transition-200 ab-icon--size-text" />
                      </span>
                    </span>
                  </button>
                </span>
              </div>
            </label>
          </div>
          {dropdownVisible && (
            <div
              ref={dropdownRef}
              className={`ab-select__dropdown ${
                dropdownVisible ? '' : 'ab-select__dropdown--hidden'
              }`}
              style={{
                position: 'absolute',
                inset: '0px auto auto 0px',
                margin: '0px',
                transform: 'translate(0px, 66px)',
              }}>
              {filteredOptions.map((option) => (
                <button
                  key={option.id}
                  className="ab-dropdown-button ab-dropdown-button_default"
                  onClick={() => handleSelectOption(option)}>
                  <span className="flex items-start white">
                    <span className="flex max-w-full">
                      <div
                        className="eb-island-icon flex-shrink-0 mt-1 rounded-md"
                        style={{ width: '30px', height: '30px' }}>
                        {prefixSvg}
                      </div>
                      {renderOption(option)}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        {description && <span className="ab-description block mt-2">{description}</span>}
      </div>
    </>
  );
};

export default Select;
