import React, { useContext, useEffect } from "react";
import { DayPilot, DayPilotNavigator } from "daypilot-pro-react";
import { CalendarContext } from "../../contexts/CalendarContexts";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import "../../scss/CalendarStyles.scss";

const russianLocale = {
	dayNames: [
		"Воскресенье",
		"Понедельник",
		"Вторник",
		"Среда",
		"Четверг",
		"Пятница",
		"Суббота",
	],
	dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
	monthNames: [
		"Январь",
		"Февраль",
		"Март",
		"Апрель",
		"Май",
		"Июнь",
		"Июль",
		"Август",
		"Сентябрь",
		"Октябрь",
		"Ноябрь",
		"Декабрь",
	],
	monthNamesShort: [
		"Янв",
		"Фев",
		"Мар",
		"Апр",
		"Май",
		"Июн",
		"Июл",
		"Авг",
		"Сен",
		"Окт",
		"Ноя",
		"Дек",
	],
	timePattern: "H:mm",
	datePattern: "dd.MM.yyyy",
	dateTimePattern: "dd.MM.yyyy H:mm",
	weekStarts: 1, // Начало недели с понедельника
};

DayPilot.Locale.register(new DayPilot.Locale("ru-ru", russianLocale));

const CalendarNavigator = () => {
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const { selectedDate, setSelectedDate, setRangeStart } =
		useContext(CalendarContext);

	const handleDateSelection = args => {
		// Выводим выбранную дату в консоль для проверки
		console.log("Выбранная дата:", args.day.value);

		// Форматируем выбранную дату в ожидаемый формат
		const formattedDate = dayjs(args.day.value).format("YYYY-MM-DD");

		// Выводим отформатированную дату в консоль для проверки
		console.log("Форматированная дата:", formattedDate);

		// Устанавливаем выбранную дату в состояние
		setSelectedDate(args.day);

		// Выводим обновленное значение selectedDate в консоль для проверки
		console.log("Updated selectedDate:", selectedDate);

		// Получаем значение параметра "today" из строки запроса
		const today = searchParams.get("today");

		// Устанавливаем начальную дату диапазона в форматированную дату
		setRangeStart(formattedDate);

		// Генерируем маршрут и переходим по нему
		navigate(`/dashboard/calendar?today=${today}&range_start=${formattedDate}`);
	};

	return (
		<DayPilotNavigator
			theme={"eb-calendar_"}
			locale={"ru-ru"}
			selectMode={"day"}
			showMonths={1}
			selectionDay={selectedDate}
			autoFocusOnClick={true}
			onTimeRangeSelect={handleDateSelection}
		/>
	);
};

export default CalendarNavigator;
