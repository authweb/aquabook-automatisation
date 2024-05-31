import React, { useState } from "react";

const ButtonChips = ({ children, className, ...props }) => {
	const [isActive, setIsActive] = useState(false);

	const toggleActive = () => {
		setIsActive(!isActive);
	};

	const buttonClass = `chips-button ${className} ${isActive ? " active" : ""}`;

	return (
		<button
			type='button'
			className={buttonClass}
			onClick={toggleActive}
			{...props}>
			{children}
		</button>
	);
};

export default ButtonChips;
