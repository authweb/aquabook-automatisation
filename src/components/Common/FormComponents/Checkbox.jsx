import React from "react";

const CheckBox = ({ isChecked, onChange, field_label }) => {
	return (
		<div className="ui-kit-checkbox flex flex-row">
			<label className={`${isChecked ? "checkbox-label checked" : "checkbox-label"}`}>
				<input
					type='checkbox'
					className='checkbox__input'
					onChange={(e) => {
						e.stopPropagation();  // Предотвращаем всплытие события
						onChange(e);
					}}
					checked={isChecked}
				/>
				<span className='checked__mark'></span>
				<div
					name='checkbox-checkmark'
					className='ui-kit-svg-icon checkbox-checkmark sized'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M16.3989 9.26352C16.7895 9.65401 16.7896 10.2872 16.3991 10.6777L11.6121 15.4657C11.4246 15.6533 11.1702 15.7587 10.905 15.7587C10.6397 15.7587 10.3854 15.6534 10.1978 15.4658L8.00481 13.2728C7.61428 12.8823 7.61428 12.2491 8.00481 11.8586C8.39533 11.4681 9.0285 11.4681 9.41902 11.8586L10.9048 13.3444L14.9847 9.26367C15.3752 8.87311 16.0084 8.87304 16.3989 9.26352Z'
							fill='currentColor'
						/>
					</svg>
				</div>
			</label>
			<label className="pl-2.5 pt-1">{field_label}</label>
		</div>
	);
};

export default CheckBox;
