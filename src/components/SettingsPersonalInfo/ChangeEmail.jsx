import React, { useState } from 'react';

const ChangeEmail = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = () => {
    // Здесь вы можете обработать изменение адреса электронной почты
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Новый адрес электронной почты"
      />
      <button onClick={handleEmailChange}>Изменить адрес электронной почты</button>
    </div>
  );
};

export default ChangeEmail;
