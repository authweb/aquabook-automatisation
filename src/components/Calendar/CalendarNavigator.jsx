import React, { useContext } from 'react';
import { DayPilot, DayPilotNavigator } from '@daypilot/daypilot-lite-react';
import { CalendarContext } from '../../contexts/CalendarContexts';
import { useNavigate } from 'react-router-dom';
import '../../scss/homepage.scss';

const CalendarNavigator = () => {
  const navigate = useNavigate();
  const { selectedDate, setSelectedDate } = useContext(CalendarContext);

  return (
    <DayPilotNavigator
      selectMode={'day'}
      showMonths={1}
      selectionDay={selectedDate}
      onTimeRangeSelected={(args) => {
        setSelectedDate(args.day);
        navigate(`time-table/${args.day.toString('yyyy-MM-dd')}`);
      }}
    />
  );
};

export default CalendarNavigator;
