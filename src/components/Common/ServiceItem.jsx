const ServiceItem = ({ selectedServices }) => {
	// Проверяем, что объект selectedServices существует и содержит ожидаемые свойства
	if (
		!selectedServices ||
		!selectedServices.name ||
		!selectedServices.price_from
	) {
		return null; // Если какие-либо из ожидаемых свойств отсутствуют или объект не существует, возвращаем null, чтобы компонент не рендерился
	}

	let priceText = "";
	if (selectedServices.price_to && parseFloat(selectedServices.price_to) > 0) {
		// Если есть максимальная цена, отображаем диапазон
		priceText = `${selectedServices.price_from} - ${selectedServices.price_to} ₽`;
	} else {
		// Если нет максимальной цены, отображаем только начальную цену
		priceText = `от ${selectedServices.price_from} ₽`;
	}

	return (
		<page-services-item class='service-item frame'>
			<ui-kit-simple-cell>
				<div className='left-part' style={{ width: 48 }}></div>
				<div className='center-part'>{selectedServices.name}</div>
				<div className='right-part'>{priceText}</div>
			</ui-kit-simple-cell>
		</page-services-item>
	);
};

export default ServiceItem;
