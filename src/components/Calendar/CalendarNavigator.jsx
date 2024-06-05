import React, { useContext, useEffect } from "react";
import Calendar from "react-calendar";
import { CalendarContext } from "../../contexts/CalendarContexts";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import "../../scss/CalendarStyles.scss"; // Ваши стили для календаря

const CalendarNavigator = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { selectedDate, setSelectedDate, setRangeStart } = useContext(CalendarContext);

	const handleDateSelection = date => {
		// Форматируем выбранную дату в ожидаемый формат
		const formattedDate = dayjs(date).format("YYYY-MM-DD");

		// Устанавливаем выбранную дату в состояние
		setSelectedDate(date);

		// Получаем значение параметра "today" из строки запроса
		const today = searchParams.get("today");

		// Устанавливаем начальную дату диапазона в форматированную дату
		setRangeStart(formattedDate);

		// Генерируем маршрут и переходим по нему
		navigate(`/dashboard/calendar?today=${today}&range_start=${formattedDate}`);
	};

	useEffect(() => {
		const labelElement = document.querySelector('.custom-calendar .react-calendar__navigation__label');
		if (labelElement) {
			labelElement.style.flexGrow = '2';
		}
	}, []);

	return (
		<Calendar
			onChange={handleDateSelection}
			value={selectedDate}
			locale="ru-RU"
			minDetail="month"
			maxDetail="month"
			next2Label={null}
			prev2Label={null}
			showNeighboringMonth={true}
			showNavigation={true}
			className="custom-calendar"
		/>
	);
};

export default CalendarNavigator;
