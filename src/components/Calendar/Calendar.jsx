import React, { useState, useEffect, useContext } from 'react';
import { DayPilot, DayPilotCalendar } from 'daypilot-pro-react';
import axios from 'axios';
import dayjs from 'dayjs';
import ModalForm from './ModalForm';
import { CalendarContext } from '../../contexts/CalendarContexts';
import useDateHandler from '../../hooks/useDateHandler';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import '../../scss/CalendarStyles.scss';
import { AddAppointment } from './AddAppointments';

const CalendarDay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, setSelectedEmployeeId } = useContext(CalendarContext);
  const { today, rangeStart, setToday, setRangeStart } = useDateHandler();

  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [timeRange, setTimeRange] = useState([dayjs().startOf('hour'), dayjs().endOf('hour')]);
  const [notes, setNotes] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [last_name, setLastName] = useState('');
  const [totalCost, settotalCost] = useState('');
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState({});

  // Эффект для обработки изменения selectedDate
  useEffect(() => {
    let formattedDate;
    if (selectedDate instanceof dayjs) {
      // проверка, является ли selectedDate объектом dayjs
      formattedDate = selectedDate.format('YYYY-MM-DD');
    } else {
      formattedDate = dayjs(selectedDate).format('YYYY-MM-DD'); // преобразование в объект dayjs, если это необходимо
    }

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

        const appointments = appointmentsResponse.data.appointments.map((appointment) => ({
          start: appointment.start,
          end: appointment.end,
          selectedServices: appointment.selectedServices,
          serviceEmployeeMap: appointment.serviceEmployeeMap,
          text: appointment.text,
          clients_id: appointment.clients_id,
          totalCost: appointment.totalCost,
        }));

        setCategories(servicesCategories);
        setServices(services);

        const columns = employeesResponse.data.employees.map((employee) => ({
          name: employee.first_name,
          id: employee.id,
        }));

        setConfig((prevConfig) => ({
          ...prevConfig,
          columns,
        }));
        setEvents(appointments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

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
    timeFormat: 'Clock24Hours',
    showNonBusiness: false,
    timeHeaders: [
      { groupBy: 'Day', format: 'dddd MMMM yyyy' },
      { groupBy: 'Hour', format: 'h tt' },
    ],
    cellDuration: 15,
    timeRangeSelectedHandling: 'Enabled',
  });

  //   const addAppointment = async (newEvent) => {
  //     try {
  //       const response = await axios.post('http://localhost:3001/api/appointments', newEvent);
  //       console.log('Server response', response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const addClient = async (clientData) => {
  //     try {
  //       const response = await axios.post('http://localhost:3001/api/clients', clientData);
  //       setClientsId(response.data.id);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const handleOk = async () => {
  //     console.log('handleOk is called');
  //     const now = dayjs();
  //     const defaultStart = now
  //       .add(new Date().getHours(), 'hour')
  //       .add(new Date().getMinutes(), 'minute');
  //     const defaultEnd = defaultStart.add(2, 'hour');

  //     let start;
  //     let end;

  //     if (
  //       date &&
  //       date.isValid() &&
  //       timeRange[0] &&
  //       timeRange[0].isValid() &&
  //       timeRange[1] &&
  //       timeRange[1].isValid()
  //     ) {
  //       start = date.format('YYYY-MM-DD') + ' ' + timeRange[0].format('HH:mm:ss');
  //       end = date.format('YYYY-MM-DD') + ' ' + timeRange[1].format('HH:mm:ss');
  //     } else {
  //       start = defaultStart.format('YYYY-MM-DD HH:mm:ss');
  //       end = defaultEnd.format('YYYY-MM-DD HH:mm:ss');
  //     }

  //     const newEvent = {
  //       id: DayPilot.guid(),
  //       start: start,
  //       end: end,
  //       clientName: clientName,
  //       selectedServices: service,
  //       serviceEmployeeMap: employee,
  //       email: email,
  //       clients_id: clientsId,
  //       totalCost: totalCost,
  //     };

  //     newEvent.text = `${newEvent.clientName} ${newEvent.selectedServices} ${newEvent.phone} ${newEvent.email} ${newEvent.totalCost}`;

  //     setEvents((prevEvents) => {
  //       const updatedEvents = [...prevEvents, newEvent];
  //       return updatedEvents;
  //     });

  //     setClientName('');
  //     setService('');
  //     setDate(null);
  //     setTimeRange([null, null]);
  //     setNotes('');
  //     setIsModalVisible(false);

  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3001/api/clients?phone=${phone}&email=${email}`,
  //       );
  //       if (response.data.length > 0) {
  //         setClientsId(response.data[0].id);
  //         await addAppointment(newEvent);
  //       } else {
  //         await addClient({
  //           first_name: clientName,
  //           last_name: last_name,
  //           phone: phone,
  //           email: email,
  //         });
  //         await addAppointment({ ...newEvent, clients_id: clientsId });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

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
        startDate={
          selectedDate instanceof dayjs
            ? selectedDate.format('YYYY-MM-DD')
            : dayjs(selectedDate).format('YYYY-MM-DD')
        }
        events={events}
        {...config}
        onTimeRangeSelected={handleTimeRangeSelected}
      />
      {/* <AddAppointments /> */}
    </>
  );
};

export default CalendarDay;
