import React, { createContext, useState } from 'react';
import dayjs from 'dayjs';

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [rangeStart, setRangeStart] = useState(currentDate); // добавьте эту строку

  return (
    <CalendarContext.Provider value={{ selectedDate, setSelectedDate, rangeStart, setRangeStart }}>
      {children}
    </CalendarContext.Provider>
  );
};
