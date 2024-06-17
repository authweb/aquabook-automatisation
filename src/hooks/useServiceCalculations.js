import { useState, useCallback } from "react";

const useServiceCalculations = selectedServices => {
	const [validServices, setValidServices] = useState([]);
	const [hasOnlyFromPrice, setHasOnlyFromPrice] = useState(false);
	const [totalServices, setTotalServices] = useState(0);
	const [totalMinutes, setTotalMinutes] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [totalMinPrice, setTotalMinPrice] = useState(0);
	const [totalMaxPrice, setTotalMaxPrice] = useState(0);

	// Фильтрация выбранных услуг и вычисление стоимости и времени
	const calculateServices = useCallback(() => {
		const filteredServices = selectedServices.filter(
			service => service && service.duration != null,
		);
		setValidServices(filteredServices);

		const totalServicesCount = filteredServices.length;
		setTotalServices(totalServicesCount);

		const totalMins = filteredServices.reduce(
			(acc, service) => acc + (service.duration || 0),
			0,
		);
		setTotalMinutes(totalMins);

		const hrs = Math.floor(totalMins / 60);
		setHours(hrs);

		const mins = totalMins % 60;
		setMinutes(mins);

		const prices = filteredServices.reduce(
			(acc, service) => {
				const minPrice = parseFloat(service.price_from) || 0;
				const maxPrice = parseFloat(service.price_to) || 0;

				if (maxPrice === 0) {
					setHasOnlyFromPrice(true);
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

		setTotalMinPrice(prices.totalMinPrice);
		setTotalMaxPrice(prices.totalMaxPrice);
	}, [selectedServices]);

	// Форматирование времени
	const formatDuration = () =>
		`${hours > 0 ? `${hours} ч. ` : ""}${minutes} мин.`;

	// Форматирование текста ценового диапазона
	const getPriceText = () =>
		hasOnlyFromPrice
			? `от ${totalMinPrice} ₽`
			: `${totalMinPrice} - ${totalMaxPrice} ₽`;

	// Получение текста о количестве услуг
	const getServiceCountText = count => {
		if (count === 1) return "1 услуга";
		else if (count > 1 && count < 5) return `${count} услуги`;
		return `${count} услуг`;
	};

	return {
		calculateServices,
		validServices,
		totalServices,
		totalMinutes,
		hours,
		minutes,
		totalMinPrice,
		totalMaxPrice,
		formatDuration,
		getPriceText,
		getServiceCountText,
	};
};

export default useServiceCalculations;
