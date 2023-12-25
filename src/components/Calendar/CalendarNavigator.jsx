import React, { useContext } from 'react';
import { DayPilotNavigator } from 'daypilot-pro-react';
import { CalendarContext } from '../../contexts/CalendarContexts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import '../../scss/CalendarStyles.scss';

const CalendarNavigator = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { selectedDate, setSelectedDate, setRangeStart } = useContext(CalendarContext);

  const handleDateSelection = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const rangeStart = dayjs(date).add(1, 'day').format('YYYY-MM-DD');
    navigate(`/dashboard/calendar?today=${formattedDate}&range_start=${rangeStart}`);
  };

  return (
    <DayPilotNavigator
      theme={'eb-calendar_'}
      selectMode={'day'}
      showMonths={1}
      selectionDay={selectedDate}
      autoFocusOnClick={true}
      onTimeRangeSelect={(args) => {
        const formattedDate = dayjs(args.day.value).format('YYYY-MM-DD');
        console.log('Выбранная дата:', formattedDate);
        setSelectedDate(args.day);
        console.log('Updated selectedDate:', selectedDate);
        const today = searchParams.get('today');
        setRangeStart(formattedDate);
        navigate(`/dashboard/calendar?today=${today}&range_start=${formattedDate}`);
      }}
    />
  );
};

export default CalendarNavigator;
