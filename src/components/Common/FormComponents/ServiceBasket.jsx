import React from "react";
import ProfileButton from "./ProfileButton";

const ServiceBasket = ({
	selectedServices,
	onNextStep,
	formState,
	setFormState,
}) => {
	const validServices = selectedServices.filter(
		service => service && service.duration != null,
	);

	let hasOnlyFromPrice = false; // Флаг, указывающий, что все услуги имеют только начальную цену
	const totalServices = validServices.length;

	const totalMinutes = validServices.reduce(
		(acc, service) => acc + (service.duration || 0),
		0,
	);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	const { totalMinPrice, totalMaxPrice } = validServices.reduce(
		(acc, service) => {
			const minPrice = parseFloat(service.price_from) || 0;
			const maxPrice = parseFloat(service.price_to) || 0;

			if (maxPrice === 0) {
				// Если maxPrice равен 0, то считаем это как "от"
				hasOnlyFromPrice = true;
			}

			return {
				totalMinPrice: acc.totalMinPrice + minPrice,
				totalMaxPrice:
					maxPrice > 0
						? acc.totalMaxPrice + maxPrice
						: acc.totalMaxPrice + minPrice,
			};
		},
		{ totalMinPrice: 0, totalMaxPrice: 0 },
	);

	const formatDuration = (hours, minutes) =>
		`${hours > 0 ? `${hours} ч. ` : ""}${minutes} мин.`;

	// Форматируем вывод ценового диапазона или "от"
	const priceText = hasOnlyFromPrice
		? `от ${totalMinPrice} ₽`
		: `${totalMinPrice} - ${totalMaxPrice} ₽`;

	const getServiceCountText = count => {
		if (count === 1) return "1 услуга";
		else if (count > 1 && count < 5) return `${count} услуги`;
		return `${count} услуг`;
	};
	return (
		<div className='service-basket background'>
			<div className='service-basket-info'>
				<div className='service-basket-counter'>
					{getServiceCountText(totalServices)}
					<span className='service-basket-total-time'>
						{formatDuration(hours, minutes)}
					</span>
				</div>
				<div className='service-basket-right-part'>
					<div className='service-basket-price'>{priceText}</div>
					<ui-kit-svg-icon class='service-selection-icon sized'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M16.1161 4.05482C16.7995 3.3714 17.9075 3.3714 18.591 4.05482L20.2801 5.74395C20.9635 6.42737 20.9635 7.5354 20.2801 8.21882L8.33608 20.1628C7.97857 20.5203 7.48391 20.7057 6.97949 20.6713L4.48257 20.5009C4.10417 20.4751 3.80461 20.1708 3.78467 19.7921L3.65533 17.3349C3.62925 16.8394 3.81467 16.3562 4.16547 16.0054L16.1161 4.05482ZM17.5303 5.11548C17.4327 5.01785 17.2744 5.01785 17.1767 5.11548L15.5959 6.6963L17.6386 8.73898L19.2194 7.15816C19.3171 7.06053 19.3171 6.90224 19.2194 6.80461L17.5303 5.11548ZM16.5779 9.79964L14.5353 7.75696L5.22613 17.0661C5.17602 17.1162 5.14953 17.1852 5.15325 17.256L5.24767 19.0496L7.08162 19.1748C7.15368 19.1797 7.22435 19.1532 7.27542 19.1022L16.5779 9.79964Z'
								fill='currentColor'></path>
						</svg>
					</ui-kit-svg-icon>
				</div>
				<ProfileButton
					onNextStep={onNextStep}
					totalServices={totalServices}
					selectedServices={selectedServices}
					title={"Продолжить"}
					className='fixed-button'
				/>
			</div>
		</div>
	);
};

export default ServiceBasket;
