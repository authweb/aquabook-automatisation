import React from 'react';
import { useAuth } from '../../contexts/AuthContexts';

const DeleteCarInfoButton = () => {
  const { deleteCarInfo } = useAuth();

  const handleDeleteCarInfo = () => {
    deleteCarInfo();
  };

  return (
    <button className="deleteCarInfo" onClick={handleDeleteCarInfo}>
      Удалить
    </button>
  );
};

export default DeleteCarInfoButton;
