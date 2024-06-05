import React, { useState, useEffect, useContext, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ru } from 'date-fns/locale';
import { CalendarContext } from "../../contexts/CalendarContexts";
import useDateHandler from "../../hooks/useDateHandler";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import 'react-big-calendar/lib/css/react-big-calendar.css'; // Подключение стилей
import "../../scss/CalendarStyles.scss"; // Подключение ваших собственных стилей
import { AppointmentDetails } from "../";

// Подключение плагинов
dayjs.extend(utc);
dayjs.extend(timezone);

const locales = {
	'ru': ru,
};

const localizer = dateFnsLocalizer({
	format: (date, formatStr, options) => format(date, formatStr, { locale: ru }),
	parse: (date, formatStr, options) => parse(date, formatStr, new Date(), { locale: ru }),
	startOfWeek: (options) => startOfWeek(new Date(), { locale: ru }),
	getDay: (date, options) => getDay(date, { locale: ru }),
	locales,
});

const CalendarDay = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const { setSelectedEmployeeId, setCurrentEventId } = useContext(CalendarContext);
	const { today, rangeStart, setToday, setRangeStart } = useDateHandler(); // Получаем сегодня из хука
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [hoveredEvent, setHoveredEvent] = useState(null);

	const [events, setEvents] = useState([]);
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState({});
	const [resources, setResources] = useState([]); // Добавляем состояние для ресурсов

	const handleEventClick = useCallback(
		async (event) => {
			const eventId = event.id;
			setCurrentEventId(eventId);
			navigate(`/dashboard/appointments/${eventId}`);

			try {
				const response = await axios.get(`/api/appointments/${eventId}`);
				setSelectedEvent(response.data.appointment);
			} catch (error) {
				console.error("Error fetching event details:", error);
			}
		},
		[navigate, setCurrentEventId]
	);

	const handleDateClick = useCallback(
		(slotInfo) => {
			const timePart = dayjs(slotInfo.start).format("HH:mm:ss");
			const rangeStart = searchParams.get("range_start");
			const selectedStart = `${rangeStart}T${timePart}`;
			navigate(
				`${location.pathname}/add?today=${today}&range_start=${rangeStart}&start=${selectedStart}`,
			);
		},
		[navigate, location.pathname, searchParams, today],
	);


	useEffect(() => {
		async function fetchData() {
			try {
				const [appointmentsResponse, employeesResponse, categoriesResponse, servicesResponse] = await Promise.all([
					axios.get("/api/appointments"),
					axios.get("/api/employees"),
					axios.get("/api/service-categories"),
					axios.get("/api/services"),
				]);
				const appointments = appointmentsResponse.data.appointments;
				const employees = employeesResponse.data.employees;
				const servicesCategories = categoriesResponse.data.servicesCategories;
				const services = servicesResponse.data.services;

				const eventsData = appointments.map((appt) => {
					const localStart = dayjs(appt.start).tz("Asia/Krasnoyarsk").toDate();
					const localEnd = dayjs(appt.end).tz("Asia/Krasnoyarsk").toDate();

					return {
						id: appt.id.toString(),
						start: localStart,
						end: localEnd,
						title: appt.text || "No Title",
						resourceId: appt.servicesEmployees.map((se) => se.employee_id.toString())[0],
					};
				});

				const resourcesData = employees.map(emp => ({
					id: emp.id.toString(),
					title: emp.first_name
				}));

				setEvents(eventsData);
				setResources(resourcesData);

				setCategories(servicesCategories);
				setServices(services);

				console.log("Appointments:", appointments);
				console.log("Events setup:", eventsData);
				console.log("Resources setup:", resourcesData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchData();
	}, []);

	useEffect(() => {
		const updateCalendarHeight = () => {
			const calendarContainer = document.querySelector(".rbc-calendar");
			if (calendarContainer) {
				const windowHeight = window.innerHeight;
				const headerHeight = 60; // Высота верхнего хедера
				const paddingBottom = 20; // Отступ снизу
				const calendarHeight = windowHeight - headerHeight - paddingBottom;
				calendarContainer.style.height = `${calendarHeight}px`;
				calendarContainer.style.paddingBottom = `${paddingBottom}px`;
			}
		};

		updateCalendarHeight();
		window.addEventListener("resize", updateCalendarHeight);

		return () => {
			window.removeEventListener("resize", updateCalendarHeight);
		};
	}, []);

	useEffect(() => {
		const rangeStartParam = searchParams.get("range_start");
		if (rangeStartParam) {
			setRangeStart(rangeStartParam);
		}
	}, [searchParams, setRangeStart]);

	const dateToday = rangeStart ? new Date(rangeStart) : new Date();

	const minTime = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate(), 9, 0);
	const maxTime = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate(), 21, 0);

	return (
		<>
			<Calendar
				className="ab-schedule-custom"
				localizer={localizer}
				events={events}
				resources={resources}
				startAccessor="start"
				endAccessor="end"
				titleAccessor="title"
				resourceIdAccessor="id"
				resourceTitleAccessor="title"
				selectable
				date={dateToday}
				onSelectEvent={handleEventClick}
				onSelectSlot={handleDateClick}
				onMouseOver={(event) => setHoveredEvent(event)}
				views={{ day: true }} // Только день
				defaultView='day'
				style={{ height: '100vh' }} // Высота на весь экран
				min={minTime} // Начало рабочего дня
				max={maxTime} // Конец рабочего дня
				step={15}
				timeslots={4}
				toolbar={false} // Отключение шапки
				messages={{
					today: 'Сегодня',
					previous: 'Назад',
					next: 'Вперед',
					month: 'Месяц',
					week: 'Неделя',
					day: 'День',
					date: 'Дата',
					time: 'Время',
					event: 'Событие',
				}}
			/>
			{hoveredEvent && (
				<div className="hovered-event-details">
					<p>{hoveredEvent.title}</p>
					<p>{hoveredEvent.start.toLocaleString()}</p>
					<p>{hoveredEvent.end.toLocaleString()}</p>
				</div>
			)}
			{selectedEvent && <AppointmentDetails event={selectedEvent} />}
		</>
	);
};

export default CalendarDay;
