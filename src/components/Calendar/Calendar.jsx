import React, { useState, useEffect } from 'react';
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-react';

const Calendar = () => {
  const [config, setConfig] = useState({
    viewType: 'Resources',
    startDate: '2023-06-15',
    columns: [],
    events: [
      // add your events here
    ],
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/employees') // замените на ваш URL
      .then((response) => response.json())
      .then((data) => {
        const columns = data.employees.map((employee) => ({
          name: employee.first_name,
          id: employee.id,
        }));
        setConfig((prevConfig) => ({ ...prevConfig, columns }));
      });
  }, []);

  return (
    <div>
      <DayPilotCalendar {...config} />
    </div>
  );
};

export default Calendar;
