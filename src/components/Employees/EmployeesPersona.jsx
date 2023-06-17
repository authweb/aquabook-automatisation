import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeesPersona = () => {
  let { id } = useParams();
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/employees/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setEmployee(data.employee);
        });
    }
  }, [id]);

  return (
    <div>
      <div>
        <h1>
          ФИО: {employee?.first_name} {employee?.last_name}
        </h1>
        <p>Email: {employee?.email}</p>
        <p>Phone: {employee?.phone}</p>
      </div>
    </div>
  );
};

export default EmployeesPersona;
