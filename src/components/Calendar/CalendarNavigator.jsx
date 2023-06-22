import React, { useContext } from 'react';
import { DayPilotNavigator } from 'daypilot-pro-react';
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
        console.log('Выбранная дата:', args.day.toString());
        setSelectedDate(args.day);
        console.log(args.day.toString('yyyy-MM-dd'));
        navigate(`/dashboard/${args.day.toString('yyyy-MM-dd')}`);
      }}
    />
  );
};

export default CalendarNavigator;
