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
	const { setSelectedEmployeeId, setCurrentEventId } =
		useContext(CalendarContext);
	const [events, setEvents] = useState([]);
	const [employees, setEmployees] = useState([]);
	const { selectedDate } = useContext(CalendarContext);

	useEffect(() => {
		async function fetchData() {
			try {
				const [appointmentsResponse, employeesResponse] = await Promise.all([
					axios.get("https://api.aqua-book.ru/api/appointments"),
					axios.get("https://api.aqua-book.ru/api/employees"),
				]);

				const { appointments } = appointmentsResponse.data;
				const { employees } = employeesResponse.data;

				setEmployees(employees);

				const mappedAppointments = appointments.map(appt => {
					return {
						...appt,
						start: new Date(appt.start),
						end: new Date(appt.end),
					};
				});

				setEvents(mappedAppointments);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchData();
	}, []);

	const handleTimeRangeSelected = args => {
		const selectedStart = args.start.value;
		const selectedEnd = args.end.value;
		navigate(
			`/dashboard/appointments/add?start=${selectedStart}&end=${selectedEnd}`,
		);
	};

	const handleEventClick = args => {
		const eventId = args.e.data.id;
		setCurrentEventId(eventId);
		navigate(`/dashboard/appointments/${eventId}`);
	};

	return (
		<>
			<DayPilotCalendar
				startDate={selectedDate}
				events={events}
				timeRangeSelectedHandling='Enabled'
				onTimeRangeSelected={handleTimeRangeSelected}
				onEventClick={handleEventClick}
				businessBeginsHour={9}
				businessEndsHour={21}
				timeHeaders={[
					{ groupBy: "Day", format: "dddd MMMM yyyy" },
					{ groupBy: "Hour", format: "h tt" },
				]}
				cellDuration={15}
				viewType='Day'
			/>
		</>
	);
};

export default CalendarDay;
