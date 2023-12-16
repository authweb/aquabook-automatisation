import React, { createContext, useState } from 'react';
import dayjs from 'dayjs';

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [rangeStart, setRangeStart] = useState(currentDate);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [currentEventId, setCurrentEventId] = useState(null);

  console.log('"Id" Сотрудника:', selectedEmployeeId);
  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        rangeStart,
        setRangeStart,
        selectedEmployeeId,
        setSelectedEmployeeId,
        currentEventId, // Добавлено в контекст
        setCurrentEventId, // Добавлено в контекст
      }}>
      {children}
    </CalendarContext.Provider>
  );
};
