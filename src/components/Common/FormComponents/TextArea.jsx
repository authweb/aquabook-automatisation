import React, { useState, useRef, useEffect } from "react";

const TextArea = ({
	id,
	prefix,
	type,
	name,
	onChange,
	value,
	placeholder,
	createPlaceholder,
	autoComplete,
	required,
	colsSpan,
}) => {
	const [isFilled, setIsFilled] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const textAreaRef = useRef(null);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleChange = event => {
		onChange(event);
		autoResize(event.target);
	};

	const handleBlur = event => {
		setIsFilled(event.target.value !== "");
	};

	const autoResize = (textarea) => {
		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight}px`;
	};

	useEffect(() => {
		if (textAreaRef.current) {
			autoResize(textAreaRef.current);
		}
	}, [value]);

	const isValueFilled = value !== "";

	return (
		<div className='grid grid-cols-1 gap-6 items-start'>
			<div
				htmlFor={id}
				className={`ab-text-field is-textarea ${isFocused || isValueFilled ? "is-filled" : ""
					} has-label`}>
				<textarea
					ref={textAreaRef}
					type={type}
					name={name}
					value={value}
					autoComplete={autoComplete}
					placeholder={placeholder}
					create-placeholder={createPlaceholder}
					required={required}
					className='ab-text-field__element p-3'
					id={id}
					onChange={onChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					style={{
						overflow: "hidden",
						overflowWrap: "break-word",
						resize: "none",
					}}
				/>
				<div className='ab-text-field__label'>{prefix}</div>
			</div>
		</div>
	);
};

export default TextArea;
