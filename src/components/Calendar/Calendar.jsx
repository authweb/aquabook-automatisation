import React, { useState, useEffect, useContext, useCallback } from "react";
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
				`${location.pathname}/add${location.search}&start=${
					selectedStart ? selectedStart.format("YYYY-MM-DDTHH:mm:ss") : ""
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
				const [
					appointmentsResponse,
					employeesResponse,
					categoriesResponse,
					servicesResponse,
				] = await Promise.all([
					axios.get("https://api.aqua-book.ru/api/appointments"),
					axios.get("https://api.aqua-book.ru/api/employees"),
					axios.get("https://api.aqua-book.ru/api/service-categories"),
					axios.get("https://api.aqua-book.ru/api/services"),
				]);

				console.log("Appointments Response:", appointmentsResponse);
				console.log("Employees Response:", employeesResponse);
				console.log("Categories Response:", categoriesResponse);
				console.log("Services Response:", servicesResponse);

				const { servicesCategories } = categoriesResponse.data;
				const { services } = servicesResponse.data;

				setCategories(servicesCategories);
				setServices(services);

				const columns = employeesResponse.data.employees.map(employee => ({
					name: employee.first_name,
					id: employee.id.toString(),
				}));

				setConfig(prevConfig => ({
					...prevConfig,
					columns,
				}));

				// Create a map for employee IDs
				const employeeMap = new Map();
				employeesResponse.data.employees.forEach(employee => {
					employeeMap.set(employee.first_name, employee.id);
				});

				const fetchedEvents = appointmentsResponse.data.appointments
					.map(appt => {
						const employeeId = employeeMap.get(appt.serviceEmployeeMap);

						if (employeeId === undefined) {
							console.error(
								`Employee ID for '${appt.serviceEmployeeMap}' not found.`,
							);
							return null;
						}

						return {
							id: appt.id.toString(),
							start: appt.start,
							end: appt.end,
							text: appt.text,
							resource: employeeId.toString(),
							backColor: "#someColor",
						};
					})
					.filter(event => event !== null);

				setEvents(fetchedEvents);
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
