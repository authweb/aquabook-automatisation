import React, { useState } from "react";
import {
	format,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	addMonths,
	addDays,
	getDay,
	isToday,
} from "date-fns";
import TimeSlot from "./TimeSlot";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import ProfileButton from "../../Common/FormComponents/ProfileButton";

// Основной компонент календаря
const DatePicker = () => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

	// Предположим, что мы рендерим 3 блока .calendar-days-container
	const visibleWeeksCount = 3;

	const WeekNames = () => {
		const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
		return (
			<div className='calendar-week-names-container'>
				{weekDays.map(day => (
					<div className='week-name' key={day}>
						{day}
					</div>
				))}
			</div>
		);
	};

	const daysOfMonth = eachDayOfInterval({
		start: startOfMonth(currentMonth),
		end: endOfMonth(currentMonth),
	});

	// Определение первой и последней недели для видимости
	const firstWeekIndex = currentWeekIndex;
	const lastWeekIndex = firstWeekIndex + visibleWeeksCount;

	let startDayOfWeek = getDay(startOfMonth(currentMonth));
	if (startDayOfWeek === 0) startDayOfWeek = 7; // Если воскресенье, считаем его седьмым днём

	const paddedDays = Array.from({ length: startDayOfWeek - 1 }, (_, i) =>
		addDays(startOfMonth(currentMonth), -i - 1),
	).reverse();

	const allDays = [...paddedDays, ...daysOfMonth];

	const weeks = allDays.reduce((weekAccumulator, day, index) => {
		const weekIndex = Math.floor(index / 7);
		weekAccumulator[weekIndex] = [...(weekAccumulator[weekIndex] || []), day];
		return weekAccumulator;
	}, []);

	// Выбираем только видимые недели
	const visibleWeeks = weeks.slice(firstWeekIndex, lastWeekIndex);

	// Логика переключения недель
	const handlePrevWeek = () => {
		setCurrentWeekIndex(currentWeekIndex => {
			if (currentWeekIndex - 1 < 0) {
				setCurrentMonth(currentMonth => addMonths(currentMonth, -1));
				return weeks.length - visibleWeeksCount; // Присваиваем индекс последних видимых недель предыдущего месяца
			} else {
				return currentWeekIndex - 1;
			}
		});
	};

	const handleNextWeek = () => {
		setCurrentWeekIndex(currentWeekIndex => {
			if (currentWeekIndex + visibleWeeksCount >= weeks.length) {
				setCurrentMonth(currentMonth => addMonths(currentMonth, 1));
				return 0; // Присваиваем индекс первых недель следующего месяца
			} else {
				return currentWeekIndex + 1;
			}
		});
	};

	function generateTimeSlots(startHour, endHour, intervalInMinutes) {
		const slots = [];

		for (let hour = startHour; hour <= endHour; hour++) {
			for (let minute = 0; minute < 60; minute += intervalInMinutes) {
				const time = `${hour.toString().padStart(2, "")}:${minute
					.toString()
					.padStart(2, "0")}`;

				slots.push(time);
				if (hour === endHour && minute >= 60 - intervalInMinutes) {
					break; // Предотвращаем создание слотов за пределами endHour
				}
			}
		}
		return slots;
	}

	const timeSlots = {
		morning: generateTimeSlots(9, 11, 15),
		day: generateTimeSlots(12, 17, 15),
		evening: generateTimeSlots(18, 20, 15),
	};
	const handleTimeSelect = time => {
		setSelectedTime(time);
	};
	// Заглушка для определения доступности временных слотов
	const isTimeSlotAvailable = time => true;

	const handleDateSelect = date => {
		setSelectedDate(date);
		// Сброс выбранного времени
		setSelectedTime(null);
	};

	const renderVisibleWeeks = visibleWeeks.map((week, weekIndex) => (
		<div className='calendar-days-container' key={weekIndex}>
			{week.map((day, dayIndex) => {
				// Check if the day is the current day
				const isCurrentDay = isToday(day);

				// CSS class setup for ui-kit-calendar-day depending on the condition
				let dayClass =
					format(day, "MM") === format(currentMonth, "MM")
						? isCurrentDay
							? "active today"
							: ""
						: "greyed-out";

				// Conditionally include the background div for the current day
				let currentDayBackground = isCurrentDay ? (
					<div className='background'></div>
				) : null;

				return (
					<div className='calendar-day'>
						<ui-kit-calendar-day class={`${dayClass.trim()}`} key={dayIndex}>
							<div className='calendar-day-number'>
								<span className='calendar-day-number-text'>
									{format(day, "d")}
								</span>
								{currentDayBackground}
							</div>
						</ui-kit-calendar-day>
					</div>
				);
			})}
		</div>
	));

	// Рендеринг временных слотов
	const renderTimeSlots = (slots, partOfDay) => (
		<page-scrollable-time-intervals>
			<p className='label'>{partOfDay}</p>
			<ui-kit-horizontal-scrollable>
				<div className='flex-container'>
					{slots.map(time => (
						<TimeSlot
							key={time}
							time={time}
							available={isTimeSlotAvailable(time)}
							isSelected={selectedTime === time} // Свойство для определения активности слота
							onSelect={handleTimeSelect}
						/>
					))}
				</div>
			</ui-kit-horizontal-scrollable>
		</page-scrollable-time-intervals>
	);

	return (
		<>
			<p className='label'></p>
			<ui-kit-calendar>
				<div className='calendar-header'>
					<ui-kit-calendar-month>
						<div className='calendar-month'>
							<span className='calendar-month-name'>
								{format(currentMonth, "MMMM yyyy")}
							</span>
						</div>
					</ui-kit-calendar-month>
					<ui-kit-arrows class='ab-trigger ab-trigger-monthBlankAnimation'>
						<div className='arrow' onClick={handlePrevWeek}>
							<CaretLeftOutlined className='arrow__left sized' />
						</div>
						<div className='arrow' onClick={handleNextWeek}>
							<CaretRightOutlined className='arrow__right sized' />
						</div>
					</ui-kit-arrows>
				</div>
				<div className='ab-trigger ab-trigger-monthBlackAnimation'>
					<div className='calendar-body'>
						<WeekNames />
						<div className='calendar-body-slider ab-trigger ab-trigger-monthWeekAnimation'>
							<div className='days-slider ab-trigger ab-trigger-datesScroll'>
								{renderVisibleWeeks}
							</div>
						</div>
					</div>
				</div>
			</ui-kit-calendar>
			<div className='separate-line'></div>
			<div className='times-container'>
				<page-loader class='loader'>
					<div className='times'>
						{renderTimeSlots(timeSlots.morning, "Утро")}
						{renderTimeSlots(timeSlots.day, "День")}
						{renderTimeSlots(timeSlots.evening, "Вечер")}
					</div>
				</page-loader>
			</div>
			<ProfileButton title='Продолжить' className='select-time-button' />
		</>
	);
};

export default DatePicker;
