import React, { useState, useEffect, useContext } from 'react';
import { DayPilotCalendar } from 'daypilot-pro-react';
import axios from 'axios';
import dayjs from 'dayjs';
import { CalendarContext } from '../../contexts/CalendarContexts';
import useDateHandler from '../../hooks/useDateHandler';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import '../../scss/CalendarStyles.scss';
import { AppointmentDetails } from '../';

const CalendarDay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, setSelectedEmployeeId } = useContext(CalendarContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { today, rangeStart, setToday, setRangeStart } = useDateHandler();

  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [timeRange, setTimeRange] = useState([dayjs().startOf('hour'), dayjs().endOf('hour')]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState({});

  // Эффект для обработки изменения selectedDate
  useEffect(() => {
    const formattedDate =
      selectedDate instanceof dayjs
        ? selectedDate.format('YYYY-MM-DD')
        : dayjs(selectedDate).format('YYYY-MM-DD');

    setConfig((prevConfig) => ({
      ...prevConfig,
      startDate: formattedDate,
    }));
  }, [selectedDate]);

  useEffect(() => {
    console.log('Date state updated:', date);
  }, [date]);

  useEffect(() => {
    console.log('Time range state updated:', timeRange);
  }, [timeRange]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [appointmentsResponse, employeesResponse, categoriesResponse, servicesResponse] =
          await Promise.all([
            axios.get('http://localhost:3001/api/appointments'),
            axios.get('http://localhost:3001/api/employees'),
            axios.get('http://localhost:3001/api/service-categories'),
            axios.get('http://localhost:3001/api/services'),
          ]);

        const { servicesCategories } = categoriesResponse.data;
        const { services } = servicesResponse.data;

        setCategories(servicesCategories);
        setServices(services);

        setConfig((prevConfig) => ({
          ...prevConfig,
          columns: employeesResponse.data.employees.map((employee) => ({
            name: employee.first_name, // или fullName если вы используете полное имя
            id: employee.id.toString(),
          })),
        }));
        // Создаем карту соответствия имени сотрудника и его id
        const employeeMap = new Map();
        employeesResponse.data.employees.forEach((employee) => {
          // Здесь используется простое имя, но если у сотрудников могут быть одинаковые имена, лучше использовать полное имя или другой уникальный идентификатор
          employeeMap.set(employee.first_name, employee.id);
        });

        setEvents(
          appointmentsResponse.data.appointments
            .map((appt) => {
              // Получаем id сотрудника из карты, используя имя сотрудника из appt.serviceEmployeeMap
              const employeeId = employeeMap.get(appt.serviceEmployeeMap);

              // Добавьте проверку, чтобы убедиться, что employeeId существует
              if (employeeId === undefined) {
                console.error(`Employee ID for '${appt.serviceEmployeeMap}' not found.`);
                return null; // Возвращаем null или подходящее значение, если id сотрудника не найден
              }

              return {
                id: appt.id.toString(),
                start: appt.start,
                end: appt.end,
                text: appt.text,
                resource: employeeId.toString(),
                backColor: '#someColor',
              };
            })
            .filter((event) => event !== null), // Фильтруем события, чтобы удалить null значения
        );
        console.log(appointmentsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleEventClick = (args) => {
    const eventId = args.e.data.id;
    navigate(`/dashboard/appointments/${eventId}`);
  };

  const [config, setConfig] = useState({
    viewType: 'Resources',
    startDate: (today ? dayjs(today) : selectedDate ? dayjs(selectedDate) : dayjs()).format(
      'YYYY-MM-DD',
    ),
    columns: [],
    heightSpec: 'BusinessHoursNoScroll',
    theme: 'eb-calendar_',
    businessBeginsHour: 9,
    businessEndsHour: 21,
    onEventClick: handleEventClick,
    timeFormat: 'Clock24Hours',
    showNonBusiness: false,
    timeHeaders: [
      { groupBy: 'Day', format: 'dddd MMMM yyyy' },
      { groupBy: 'Hour', format: 'h tt' },
    ],
    cellDuration: 15,
    timeRangeSelectedHandling: 'Enabled',
  });

  const handleTimeRangeSelected = (args) => {
    console.log(args);
    setSelectedEmployeeId(args.resource);
    const selectedStart = dayjs(args.start.value);
    const selectedEnd = dayjs(args.end.value);
    navigate(
      `${location.pathname}/add${location.search}&start=${selectedStart.format(
        'YYYY-MM-DDTHH:mm:ss',
      )}&end=${selectedEnd.format('YYYY-MM-DDTHH:mm:ss')}`,
    );
  };

  return (
    <>
      <DayPilotCalendar
        className="eb-calendar__columns"
        startDate={config.startDate}
        events={events}
        {...config}
        onTimeRangeSelected={handleTimeRangeSelected}
      />
      {selectedEvent && <AppointmentDetails event={selectedEvent} />}
    </>
  );
};

export default CalendarDay;
