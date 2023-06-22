import React, { useState, useEffect, useContext } from 'react';
import { DayPilot, DayPilotCalendar } from 'daypilot-pro-react';
import { Col, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import ModalForm from './ModalForm';
import { CalendarContext } from '../../contexts/CalendarContexts';
import { useParams } from 'react-router-dom';
import { CalendarNavigator } from '../../components';

import '../../scss/calendar.scss';

const CalendarDay = () => {
  const { datetable } = useParams();
  const { selectedDate, setSelectedDate } = useContext(CalendarContext);
  const [config, setConfig] = useState({
    viewType: 'Resources',
    startDate: datetable,
    columns: [],
    events: [],
    businessBeginsHour: 9, // начало рабочего дня в 9 утра
    businessEndsHour: 21, // конец рабочего дня в 9 вечера
    timeHeaders: [
      { groupBy: 'Day', format: 'dddd MMMM yyyy' },
      { groupBy: 'Hour', format: 'h tt' },
    ],
    cellDuration: 30, // длительность ячейки в минутах
    cellWidth: 30, // ширина ячейки в пикселях
    eventHeight: 30, // высота события в пикселях
    timeRangeSelectedHandling: 'Enabled',
  });
  useEffect(() => {
    if (datetable) {
      setSelectedDate(new DayPilot.Date(datetable));
    }
  }, [datetable, setSelectedDate]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientsId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [service, setService] = useState('');
  const [date, setDate] = useState(null);
  const [timeRange, setTimeRange] = useState([null, null]);
  const [notes, setNotes] = useState('');
  const [events, setEvents] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [last_name] = useState('');

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState({});

  useEffect(() => {
    const fetchCategoriesAndServices = async () => {
      const categoriesResponse = await axios.get('http://localhost:3001/api/service-categories');
      const servicesResponse = await axios.get('http://localhost:3001/api/services');

      setCategories(categoriesResponse.data.servicesCategories);
      setServices(servicesResponse.data.services);
    };

    fetchCategoriesAndServices();
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/employees')
      .then((response) => response.json())
      .then((data) => {
        const columns = data.employees.map((employee) => ({
          name: employee.first_name,
          id: employee.id,
        }));
        setConfig((prevConfig) => ({ ...prevConfig, columns }));
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/appointments')
      .then((response) => response.json())
      .then((data) => {
        const appointments = data.appointments.map((appointment) => ({
          start: appointment.start,
          end: appointment.end,
          text: appointment.text,
          resource: appointment.resource,
          clients_id: appointment.clients_id,
        }));
        setConfig((prevConfig) => ({ ...prevConfig, events: appointments }));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleOk = async () => {
    console.log('handleOk is called');
    const now = DayPilot.Date.today();
    const defaultStart = now.addHours(new Date().getHours()).addMinutes(new Date().getMinutes());
    const defaultEnd = defaultStart.addHours(1);

    let start;
    let end;

    if (timeRange[0] && timeRange[1] && date && moment(date, 'YYYY-MM-DD', true).isValid()) {
      start = new DayPilot.Date(date)
        .addHours(timeRange[0].get('hour'))
        .addMinutes(timeRange[0].get('minute'));
      end = new DayPilot.Date(date)
        .addHours(timeRange[1].get('hour'))
        .addMinutes(timeRange[1].get('minute'));
    } else {
      // Обработка случая, когда время начала и/или окончания не выбрано
      start = defaultStart;
      end = defaultEnd;
    }

    const newEvent = {
      id: DayPilot.guid(),
      start: start,
      end: end,
      clientName: clientName,
      service: service,
      phone: phone,
      email: email,
      resource: employee,
      clients_id: clientsId,
    };

    newEvent.text = `${newEvent.clientName} ${newEvent.service} ${newEvent.phone} ${newEvent.email}`;

    console.log('newEvent', newEvent);

    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      setConfig((prevConfig) => ({ ...prevConfig, events: updatedEvents }));
      return updatedEvents;
    });

    console.log('events after update', events);

    setClientName('');
    setService('');
    setDate(null);
    setTimeRange([null, null]);
    setNotes('');
    setIsModalVisible(false);

    const addAppointment = async (newEvent) => {
      try {
        const response = await axios.post('http://localhost:3001/api/appointments', newEvent);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    try {
      const response = await axios.get(
        `http://localhost:3001/api/clients?phone=${phone}&email=${email}`,
      );
      if (response.data.length > 0) {
        // Клиент уже существует, добавляем новую запись
        newEvent.clients_id = response.data[0].id;
        await addAppointment(newEvent);
      } else {
        // Клиента не существует, добавляем нового клиента и затем новую запись
        const clientResponse = await axios.post('http://localhost:3001/api/clients', {
          first_name: clientName,
          last_name: last_name,
          phone: phone,
          email: email,
        });
        newEvent.clients_id = clientResponse.data.id;
        await addAppointment(newEvent);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}>
      <Col span={19}>
        {/* Остальной код календаря */}
        <DayPilotCalendar
          startDate={selectedDate}
          events={events}
          {...config}
          onTimeRangeSelected={(args) => {
            setEmployee(args.resource); // Запоминаем выбранного сотрудника
            showModal();
          }}
        />
        <ModalForm
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={handleOk}
          // Передайте необходимые значения и функции обратного вызова в ModalForm
          clientName={clientName}
          setClientName={setClientName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          service={service}
          setService={setService}
          categories={categories}
          services={services}
          date={date}
          setDate={setDate}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          notes={notes}
          setNotes={setNotes}
        />
      </Col>
      <Col span={5}>
        <CalendarNavigator />
      </Col>
    </Row>
  );
};

export default CalendarDay;
