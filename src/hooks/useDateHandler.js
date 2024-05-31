import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

const useDateHandler = () => {
  const [searchParams] = useSearchParams();
  const [today, setToday] = useState(null);
  const [rangeStart, setRangeStart] = useState(null);

  useEffect(() => {
    const paramToday = searchParams.get('today');
    const paramRangeStart = searchParams.get('range_start');

    const isoToday = paramToday ? dayjs(paramToday).format('YYYY-MM-DD') : null;
    const isoRangeStart = paramRangeStart ? dayjs(paramRangeStart).format('YYYY-MM-DD') : null;

    setToday(isoToday);
    setRangeStart(isoRangeStart);
  }, [searchParams]);

  return {
    today,
    rangeStart,
    setToday,
    setRangeStart,
  };
};

export default useDateHandler;
