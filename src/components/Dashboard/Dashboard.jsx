import React from 'react';
import { CalendarDay } from '../';
import useDateHandler from '../../hooks/useDateHandler';

const DashboardMain = () => {
  const { today, rangeStart, setToday, setRangeStart } = useDateHandler();

  return <CalendarDay todayParam={today} paramRangeStart={rangeStart} />;
};

export default DashboardMain;
