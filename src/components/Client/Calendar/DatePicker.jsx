import React, { useState, useEffect } from "react";
import {
	format,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	addMonths,
	addDays,
	getDay,
	isToday,
	isAfter,
	setHours,
	setMinutes,
	isBefore,
	startOfDay,
	getWeek,
} from "date-fns";
import TimeSlot from "./TimeSlot";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import ProfileButton from "../../Common/FormComponents/ProfileButton";

// Основной компонент календаря
const DatePicker = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime, onCloseModal }) => {
	// const [selectedDate, setSelectedDate] = useState(new Date());
	// const [selectedTime, setSelectedTime] = useState(null);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

	// Предположим, что мы рендерим 3 блока .calendar-days-container
	const visibleWeeksCount = 3;

	useEffect(() => {
		const today = new Date();
		const firstDayOfMonth = startOfMonth(today);
		const weeksInMonth = eachDayOfInterval({
			start: firstDayOfMonth,
			end: endOfMonth(today),
		}).reduce((weeks, day) => {
			const weekIndex = getWeek(day, { weekStartsOn: 1 });
			if (!weeks.includes(weekIndex)) {
				weeks.push(weekIndex);
			}
			return weeks;
		}, []);
		const currentWeek = getWeek(today, { weekStartsOn: 1 });
		const initialWeekIndex = weeksInMonth.indexOf(currentWeek);
		setCurrentWeekIndex(initialWeekIndex);
		setCurrentMonth(today);
	}, []);

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

	let startDayOfWeek = getDay(startOfMonth(currentMonth));
	if (startDayOfWeek === 0) startDayOfWeek = 7;

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
	const visibleWeeks = weeks.slice(currentWeekIndex, currentWeekIndex + visibleWeeksCount);

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
				const time = `${hour.toString().padStart(2, "0")}:${minute
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
	const isTimeSlotAvailable = time => {
		if (selectedDate && isToday(selectedDate)) {
			const [hour, minute] = time.split(":").map(Number);
			const slotTime = setMinutes(setHours(new Date(), hour), minute);
			return isAfter(slotTime, new Date());
		}
		return true;
	};

	const handleDateSelect = (day) => {
		setSelectedDate(day);
		setSelectedTime(null);
	};

	// Рендеринг дневных слотов
	const renderVisibleWeeks = visibleWeeks.map((week, weekIndex) => (
		<div className='calendar-days-container' key={weekIndex}>
			{week.map((day, dayIndex) => {
				const isCurrentDay = isToday(day);
				const isSelectedDay = format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
				let dayClass =
					format(day, "MM") === format(currentMonth, "MM")
						? isCurrentDay
							? isSelectedDay
								? "today active"
								: "today"
							: isSelectedDay
								? "active"
								: ""
						: "";
				let currentDayBackground = isSelectedDay ? (
					<div className='background'></div>
				) : null;

				return (
					<div
						className={`${isBefore(day, startOfDay(new Date())) ? "calendar-day greyed-out disabled" : "calendar-day"}`}
						key={dayIndex}
						onClick={() =>
							!isBefore(day, startOfDay(new Date())) && handleDateSelect(day)
						}>
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
	const renderTimeSlots = (slots, partOfDay) => {
		const availableSlots = slots.filter(isTimeSlotAvailable);
		if (availableSlots.length === 0) return null;

		return (
			<page-scrollable-time-intervals key={partOfDay}>
				<p className='label'>{partOfDay}</p>
				<ui-kit-horizontal-scrollable>
					<div className='flex-container'>
						{availableSlots.map(time => (
							<TimeSlot
								key={time}
								time={time}
								available={isTimeSlotAvailable(time)}
								isSelected={selectedTime === time}
								onSelect={handleTimeSelect}
							/>
						))}
					</div>
				</ui-kit-horizontal-scrollable>
			</page-scrollable-time-intervals>
		);
	};

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
			<ProfileButton
				title='Продолжить'
				className='select-time-button'
				onCloseModal={selectedDate && selectedTime ? onCloseModal : undefined}
				disabled={!selectedDate || !selectedTime}
				disabledClass="button-disabled"
			/>
		</>
	);
};

export default DatePicker;
