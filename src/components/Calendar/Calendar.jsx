import React, { useState, useEffect, useContext } from 'react';
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-react';
import { Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd';
import InputMask from 'react-input-mask';
import moment from 'moment';
import axios from 'axios';
import { CalendarContext } from '../../contexts/CalendarContexts';
import { useParams } from 'react-router-dom';

const CalendarDay = () => {
  const { datetable } = useParams();
  const { selectedDate } = useContext(CalendarContext);
  const [config, setConfig] = useState({
    viewType: 'Resources',
    startDate: datetable || '2023-06-15',
    columns: [],
    events: [],
  });
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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h1>Выбранная дата: {selectedDate.toString()}</h1>
      <DayPilotCalendar
        startDate={selectedDate}
        events={events}
        {...config}
        onTimeRangeSelected={(args) => {
          setEmployee(args.resource); // Запоминаем выбранного сотрудника
          setIsModalVisible(true);
        }}
      />
      <Modal open={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
        <Form>
          <Form.Item label="Имя">
            <Input value={clientName} onChange={(e) => setClientName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Почта">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Телефон">
            <InputMask
              mask="+7 999 999 99 99"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}>
              {(inputProps) => <Input {...inputProps} />}
            </InputMask>
          </Form.Item>
          <Form.Item label="Услуга">
            <Select value={service} onChange={(value) => setService(value)}>
              {categories.map((category) => (
                <Select.OptGroup label={category.name} key={category.id}>
                  {services[category.id] &&
                    services[category.id].map((serviceItem) => (
                      <Select.Option key={serviceItem.id} value={serviceItem.name}>
                        {serviceItem.name}
                      </Select.Option>
                    ))}
                </Select.OptGroup>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Дата">
            <DatePicker value={date} onChange={(value) => setDate(value)} />
          </Form.Item>
          <Form.Item label="Время записи">
            <TimePicker.RangePicker
              format="HH:mm"
              minuteStep={15}
              value={timeRange}
              onChange={(value) => setTimeRange(value)}
            />
          </Form.Item>
          <Form.Item label="Примечания">
            <Input.TextArea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendarDay;
