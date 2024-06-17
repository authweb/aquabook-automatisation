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
		<div className='page-services-item service-item frame'>
			<div className="ui-kit-simple-cell">
				<div className='left-part' style={{ width: 48 }}></div>
				<div className='center-part'>
					<div className="short-info">
						<div className="service-item-title">
							{selectedServices.name}
						</div>
					</div>
				</div>
				<div className='right-part'>
					<div className="service-actions">
						<div className="service-item-price">
							{priceText}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceItem;
