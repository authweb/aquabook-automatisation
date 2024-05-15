import React, { useState } from "react";
import TimeSlot from "./TimeSlot";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import ProfileButton from "../../Common/FormComponents/ProfileButton";

// Основной компонент календаря
const DatePicker = () => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);

	// Предполагаемая структура данных для временных слотов
	const timeSlots = {
		morning: ["9:00", "9:15", "9:30", "9:45", "10:00"],
		day: ["12:00", "12:15", "12:30", "12:45", "13:00"],
		evening: ["18:00", "18:15", "18:30", "18:45", "19:00"],
	};

	// Заглушка для определения доступности временных слотов
	const isTimeSlotAvailable = time => true; // Здесь должна быть логика определения доступности

	const handleDateSelect = date => {
		setSelectedDate(date);
		// Сброс выбранного времени
		setSelectedTime(null);
	};

	const handleTimeSelect = time => {
		setSelectedTime(time);
	};

	// Здесь должна быть реализация выбора даты...

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
							<span className='calendar-month-name'>Май</span>
						</div>
					</ui-kit-calendar-month>
					<ui-kit-arrows class='ab-trigger ab-trigger-monthBlankAnimation'>
						<div className='arrow'>
							<CaretLeftOutlined className='arrow__left sized' />
						</div>
						<div className='arrow'>
							<CaretRightOutlined className='arrow__right sized' />
						</div>
					</ui-kit-arrows>
				</div>
				<div className='ab-trigger ab-trigger-monthBlackAnimation'>
					<div className='calendar-body'>
						<div className='calendar-week-names-container'>
							<div className='week-name'>Пн</div>
							<div className='week-name'>Вт</div>
							<div className='week-name'>Ср</div>
							<div className='week-name'>Чт</div>
							<div className='week-name'>Пт</div>
							<div className='week-name'>Сб</div>
							<div className='week-name'>Вс</div>
						</div>
						<div className='calendar-body-slider ab-trigger ab-trigger-monthWeekAnimation'>
							<div className='days-slider ab-trigger ab-trigger-datesScroll'>
								<div className='calendar-days-container'>
									<div className='calendar-day'>
										<ui-kit-calendar-day class='greyed-out'>
											<div className='calendar-day-number'>
												<span className='calendar-day-number-text'>13</span>
											</div>
										</ui-kit-calendar-day>
									</div>
									<div className='calendar-day'>
										<ui-kit-calendar-day class='greyed-out'>
											<div className='calendar-day-number'>
												<span className='calendar-day-number-text'>14</span>
											</div>
										</ui-kit-calendar-day>
									</div>
									<div className='calendar-day'>
										<ui-kit-calendar-day class='greyed-out'>
											<div className='calendar-day-number'>
												<span className='calendar-day-number-text'>15</span>
											</div>
										</ui-kit-calendar-day>
									</div>
									<div className='calendar-day'>
										<ui-kit-calendar-day class='greyed-out'>
											<div className='calendar-day-number'>
												<span className='calendar-day-number-text'>16</span>
											</div>
										</ui-kit-calendar-day>
									</div>
									<div className='calendar-day'>
										<ui-kit-calendar-day class='greyed-out'>
											<div className='calendar-day-number'>
												<span className='calendar-day-number-text'>17</span>
											</div>
										</ui-kit-calendar-day>
									</div>
									<div className='calendar-day'>
										<ui-kit-calendar-day class='greyed-out'>
											<div className='calendar-day-number'>
												<span className='calendar-day-number-text'>18</span>
											</div>
										</ui-kit-calendar-day>
									</div>
									<div className='calendar-day'>
										<ui-kit-calendar-day class='greyed-out'>
											<div className='calendar-day-number'>
												<span className='calendar-day-number-text'>19</span>
											</div>
										</ui-kit-calendar-day>
									</div>
								</div>
								<div className='calendar-days-container'>
									<div className='calendar-day'>
										<ui-kit-calendar-day class='greyed-out'>
											<div className='calendar-day-number'>
												<span className='calendar-day-number-text'>15</span>
											</div>
										</ui-kit-calendar-day>
									</div>
								</div>
								<div className='calendar-days-container'>
									<div className='calendar-day'>
										<ui-kit-calendar-day class='greyed-out'>
											<div className='calendar-day-number'>
												<span className='calendar-day-number-text'>15</span>
											</div>
										</ui-kit-calendar-day>
									</div>
								</div>
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
