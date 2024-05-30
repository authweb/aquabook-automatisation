import React, { useState, useEffect, useContext, useCallback } from "react";
import { DayPilotCalendar } from "daypilot-pro-react";
import axios from "axios";
import dayjs from "dayjs";
import { CalendarContext } from "../../contexts/CalendarContexts";
import useDateHandler from "../../hooks/useDateHandler";
import { useLocation, useNavigate } from "react-router-dom";

import "../../scss/CalendarStyles.scss";
import { AppointmentDetails } from "../";

const CalendarDay = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { selectedDate, setSelectedEmployeeId, setCurrentEventId } =
		useContext(CalendarContext);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const { today } = useDateHandler();
	const [prevConfig, setPrevConfig] = useState({});

	const [events, setEvents] = useState([]);
	const [date, setDate] = useState(dayjs());
	const [timeRange, setTimeRange] = useState([
		dayjs().startOf("hour"),
		dayjs().endOf("hour"),
	]);
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState({});

	const handleEventClick = useCallback(
		args => {
			const eventId = args.e.data.id;
			setCurrentEventId(eventId);
			navigate(`/dashboard/appointments/${eventId}`);
		},
		[navigate, setCurrentEventId],
	);

	const handleTimeRangeSelected = useCallback(
		args => {
			console.log(args);
			setSelectedEmployeeId(args.resource);
			const selectedStart = args.start ? dayjs(args.start.value) : null;
			const selectedEnd = args.end ? dayjs(args.end.value) : null;

			navigate(
				`${location.pathname}/add${location.search}&start=${selectedStart ? selectedStart.format("YYYY-MM-DDTHH:mm:ss") : ""
				}&end=${selectedEnd ? selectedEnd.format("YYYY-MM-DDTHH:mm:ss") : ""}`,
			);
		},
		[navigate, setSelectedEmployeeId, location.pathname, location.search],
	);

	const [config, setConfig] = useState({
		viewType: "Resources",
		startDate: (today
			? dayjs(today)
			: selectedDate
				? dayjs(selectedDate)
				: dayjs()
		).format("YYYY-MM-DD"),
		columns: [],
		heightSpec: "BusinessHoursNoScroll",
		theme: "eb-calendar",
		businessBeginsHour: 9,
		businessEndsHour: 21,
		onEventClick: handleEventClick,
		timeFormat: "Clock24Hours",
		showNonBusiness: false,
		timeHeaders: [
			{ groupBy: "Day", format: "dddd MMMM yyyy" },
			{ groupBy: "Hour", format: "h tt" },
		],
		cellDuration: 15,
		timeRangeSelectedHandling: "Enabled",
	});

	useEffect(() => {
		const startDate =
			selectedDate instanceof dayjs
				? selectedDate.format("YYYY-MM-DD")
				: dayjs(selectedDate).format("YYYY-MM-DD");

		setPrevConfig(prevConfig => ({
			...prevConfig,
			startDate: startDate,
		}));
	}, [selectedDate, setPrevConfig]);

	useEffect(() => {
		console.log("Date state updated:", date);
	}, [date]);

	useEffect(() => {
		console.log("Time range state updated:", timeRange);
	}, [timeRange]);

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

				// Создание колонок на основе данных о сотрудниках
				const columns = employees.map(employee => ({
					name: `${employee.first_name}`,
					id: employee.id.toString(),
				}));

				// Обновление конфигурации календаря для включения новых колонок
				setConfig(prevConfig => ({
					...prevConfig,
					columns: columns,
				}));

				// Обработка и установка событий календаря
				const eventsData = appointments.map(appt => ({
					id: appt.id.toString(),
					start: appt.start,
					end: appt.end,
					text: appt.text,
					resource: appt.servicesEmployees.map(se => se.employee_id.toString())[0], // Использование ID первого сотрудника для услуги
					backColor: "#someColor",
				}));

				setEvents(eventsData);

				// Установка категорий и услуг
				setCategories(servicesCategories);
				setServices(services);

				console.log("Appointments:", appointments);
				console.log("Columns setup:", columns);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchData();
	}, []);


	return (
		<>
			<DayPilotCalendar
				className='eb-calendar__columns'
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
