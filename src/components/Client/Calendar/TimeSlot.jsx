import React, { useState } from "react";

// Компонент для отдельного временного слота
const TimeSlot = ({ time, isSelected, available, onSelect }) => {
	const handleClick = () => {
		if (available) {
			onSelect(time);
		}
	};

	// Исправьте интерполяцию классов на бэктики ` `
	return (
		<ui-kit-chips
			class={`time-interval${available ? "" : "unavailable"} ${
				isSelected ? "active" : ""
			}`}
			onClick={handleClick}>
			<span>{time}</span>
		</ui-kit-chips>
	);
};

export default TimeSlot;
