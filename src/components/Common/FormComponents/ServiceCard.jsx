import React, { useState } from "react";
import CheckBox from "./Checkbox";

const getDescriptionPreview = (description, length = 50) =>
	description.length > length
		? `${description.substring(0, length)}...`
		: description;

const ServiceCard = ({ service, onToggle, isSelected }) => {
	const [expandedDescriptions, setExpandedDescriptions] = useState({});
	// Безопасная проверка на наличие id в service и в expandedDescriptions
	const isDescriptionExpanded =
		expandedDescriptions && service && expandedDescriptions[service.id];

	const handleMoreClick = event => {
		event.stopPropagation(); // Предотвратить всплытие события при клике
		if (service && service.id) {
			toggleDescription(service.id);
		}
	};

	const toggleDescription = id => {
		setExpandedDescriptions(prev => ({
			...prev,
			[id]: !prev[id], // Переключаем состояние для конкретной услуги
		}));
	};

	if (!service) {
		return <div>Сервис не указан.</div>; // Безопасно обрабатываем отсутствие service
	}

	return (
		<page-services-card
			onClick={onToggle}
			class={`service-card ${isSelected ? "selected" : ""}`}>
			<ui-kit-service-card>
				<div>
					<ui-kit-simple-cell class='card-content-container'>
						<div className='center-part'>
							<div className='main-content'>
								<div className='title-block__title'>{service.name}</div>
								{/* comment-expanded */}
								<div
									className={`comment${
										isDescriptionExpanded ? " comment-expanded" : ""
									}`}>
									<span className='comment__seance-length'>
										{service.duration} мин
										<span
											className={`divider${
												isDescriptionExpanded ? " divider__more" : ""
											}`}>
											{" "}
											·{" "}
										</span>
									</span>

									<span className='comment__description'>
										<span className='description'>
											{isDescriptionExpanded
												? service.description
												: getDescriptionPreview(service.description)}
										</span>
									</span>
									{service.description && service.description.length > 50 && (
										<span className='comment__more' onClick={handleMoreClick}>
											{isDescriptionExpanded ? "скрыть" : "еще"}
										</span>
									)}
								</div>
								<div className='footer'>
									<div className='price-range'>
										{service.price_to === 0.0 || service.price_to === "0.00"
											? `от ${service.price_from} ₽`
											: `${service.price_from} – ${service.price_to} ₽`}
									</div>
								</div>
							</div>
						</div>
						<div className='right-part'>
							<CheckBox
								isChecked={isSelected}
								// onChange={e => {
								// 	e.stopPropagation(); // Предотвратить всплытие события при клике
								// 	onToggle(service);
								// }}
								onChange={() => onToggle(service)}
							/>
						</div>
					</ui-kit-simple-cell>
				</div>
			</ui-kit-service-card>
		</page-services-card>
	);
};

export default React.memo(ServiceCard);
