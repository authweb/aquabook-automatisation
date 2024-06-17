import React from "react";

const ProfileButton = ({
	onSubmit,
	onNextStep,
	onPrevStep,
	onOpenModal,
	onCloseModal,
	totalServices,
	to,
	title,
	className,
	disabledClass,
	locator,
	disabled,
}) => {
	return (
		<ui-kit-button class={`${className}`} data-locator={`${locator}`}>
			<button
				className={`button type-primary size-medium full-width ${disabled ? disabledClass : ""}`}
				tabIndex='0'
				onClick={e => {
					e.preventDefault();
					if (!disabled) { // Проверяем, не заблокирована ли кнопка
						if (onSubmit) onSubmit(e);
						if (onNextStep) onNextStep();
						if (onPrevStep) onPrevStep();
						if (onOpenModal) onOpenModal();
						if (onCloseModal) onCloseModal();
					}
				}}
				disabled={disabled} // Применяем атрибут disabled, если кнопка заблокирована
			>
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
