import React, { createContext, useState } from 'react';
import { DayPilot } from '@daypilot/daypilot-lite-react';

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new DayPilot.Date());

  return (
    <CalendarContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </CalendarContext.Provider>
  );
};
