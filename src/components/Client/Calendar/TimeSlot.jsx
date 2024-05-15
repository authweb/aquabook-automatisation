import React, { useState } from "react";

// Компонент для отдельного временного слота
const TimeSlot = ({ time, available, onSelect }) => {
	const handleClick = () => {
		if (available) {
			onSelect(time);
		}
	};

	return (
		<ui-kit-chips class='time-interval'>
			<span
				className={`time-slot ${available ? "available" : "unavailable"}`}
				onClick={handleClick}>
				{time}
			</span>
		</ui-kit-chips>
	);
};

export default TimeSlot;
