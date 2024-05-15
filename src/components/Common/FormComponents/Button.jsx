import React from "react";
import { Link } from "react-router-dom";

const Button = ({ buttons, to }) => {
	console.log({ buttons, to }); // Check what exactly is being passed
	return (
		<>
			<Link
				to={to}
				className='ab-button ab-button_md color-default theme-ghost'>
				<span className='ab-button__content ab-button__content_md'>
					<span className='ab-button__text'>{buttons}</span>
				</span>
			</Link>
		</>
	);
};

export default Button;
