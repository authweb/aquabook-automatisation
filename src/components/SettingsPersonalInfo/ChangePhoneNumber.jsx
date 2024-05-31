import React, { useState } from 'react';

const ChangePhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = () => {
    // Здесь вы можете обработать изменение номера телефона
  };

  return (
    <div>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Новый номер телефона"
      />
      <button onClick={handlePhoneNumberChange}>Изменить номер телефона</button>
    </div>
  );
};

export default ChangePhoneNumber;
