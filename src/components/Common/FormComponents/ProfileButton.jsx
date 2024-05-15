import React from "react";

const ProfileButton = ({
	onSubmit,
	onNextStep,
	onPrevStep,
	onOpenModal,
	totalServices,
	to,
	title,
	className,
	locator,
}) => {
	return (
		<ui-kit-button class={`${className}`} data-locator={`${locator}`}>
			<button
				className='button type-primary size-medium full-width'
				tabIndex='0'
				onClick={e => {
					e.preventDefault(); // Prevent default form submission
					if (onSubmit) onSubmit(e); // Call onSubmit if defined
					if (onNextStep) onNextStep(); // Call onNextStep if defined
					if (onPrevStep) onPrevStep(); // Call onPrevStep if defined
					if (onOpenModal) onOpenModal(); // Call onPrevStep if defined
				}}>
				<span className='button__row'>
					<div className='button__start-icon'></div>
					<div className='button__content'>{title}</div>
					<div className='button__label' data-locator='selected_service_count'>
						{totalServices}
					</div>
				</span>
				<span className='button__caption'></span>
			</button>
		</ui-kit-button>
	);
};

export default ProfileButton;
