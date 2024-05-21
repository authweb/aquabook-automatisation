import React, { useState, useEffect, useContext } from "react";
import { DayPilotCalendar } from "daypilot-pro-react";
import axios from "axios";
import dayjs from "dayjs";
import { CalendarContext } from "../../contexts/CalendarContexts";
import useDateHandler from "../../hooks/useDateHandler";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import "../../scss/CalendarStyles.scss";
import { AppointmentDetails } from "../";

const CalendarDay = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { selectedDate, setSelectedEmployeeId, setCurrentEventId } =
		useContext(CalendarContext);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const { today, rangeStart, setToday, setRangeStart } = useDateHandler();
	const [prevConfig, setPrevConfig] = useState({});

	const [events, setEvents] = useState([]);
	const [date, setDate] = useState(dayjs());
	const [timeRange, setTimeRange] = useState([
		dayjs().startOf("hour"),
		dayjs().endOf("hour"),
	]);
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState({});

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
		setConfig(prevConfig => ({
			...prevConfig,
			startDate: dayjs(selectedDate).format("YYYY-MM-DD"),
		}));
	}, [selectedDate]); // Обновлять конфигурацию каждый раз, когда selectedDate меняется

	useEffect(() => {
		async function fetchData() {
			try {
				const [appointmentsResponse, employeesResponse] = await Promise.all([
					axios.get("https://api.aqua-book.ru/api/appointments"),
					axios.get("https://api.aqua-book.ru/api/employees"),
				]);

				const { employees } = employeesResponse.data;

				// Создаем карту соответствия имени сотрудника и его id
				const employeeMap = new Map();
				employees.forEach(employee => {
					employeeMap.set(employee.id, employee.first_name);
				});

				// Преобразуем данные о назначениях в массив событий для календаря
				const events = appointmentsResponse.data.appointments
					.map(appt => {
						const employeeId = appt.employee_id;
						const employeeName = employeeMap.get(employeeId);
						if (!employeeName) {
							console.error(`Employee name for ID '${employeeId}' not found.`);
							return null;
						}
						return {
							id: appt.id.toString(),
							start: appt.start,
							end: appt.end,
							text: appt.text,
							resource: employeeId.toString(),
							backColor: "#someColor",
							employeeName: employeeName,
						};
					})
					.filter(event => event !== null);

				setEvents(events);
				console.log(appointmentsResponse);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchData();
	}, []);

	const handleEventClick = args => {
		const eventId = args.e.data.id;
		setCurrentEventId(eventId);
		navigate(`/dashboard/appointments/${eventId}`);
	};

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

	const handleTimeRangeSelected = args => {
		console.log(args);
		setSelectedEmployeeId(args.resource);
		const selectedStart = args.resource.start
			? dayjs(args.resource.start.value)
			: null;
		const selectedEnd = args.end ? dayjs(args.end.value) : null;
		navigate(
			`${location.pathname}/add${location.search}&start=${
				selectedStart ? selectedStart.format("YYYY-MM-DDTHH:mm:ss") : ""
			}&end=${selectedEnd ? selectedEnd.format("YYYY-MM-DDTHH:mm:ss") : ""}`,
		);
	};
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
