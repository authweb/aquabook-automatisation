import React from 'react';
import { useAuth } from '../../../contexts/AuthContexts';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';

const RedirectSettings = ({ to, labelText }) => {
  const { users } = useAuth();

  return (
    <Link to={to} className="block bg-card p-4 rounded-lg shadow-md hover:bg-gray-300 hover:text-gray-900 transition duration-150">
      {users && (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">{labelText}</p>
          </div>
          <MdArrowForwardIos className="text-xl" />
        </div>
      )}
    </Link>
  );
};

export default RedirectSettings;
