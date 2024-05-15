import React from "react";
import ServiceCard from "../Common/FormComponents/ServiceCard";

const ContentService = ({
	category,
	services,
	selectedServices,
	toggleService,
	isScrolling,
}) => {
	if (!category) {
		// Render nothing or a placeholder if category is undefined
		return <div>Loading...</div>; // Shows a loading state if the category data is not yet available
	}

	return (
		<page-services-group class='inner-container' id={`category-${category.id}`}>
			<h2 className='label category-title'>{category.name}</h2>

			{services?.map(service => (
				<ServiceCard
					key={service.id}
					service={service}
					isSelected={selectedServices.some(s => s.id === service.id)} // Используйте метод some для проверки наличия по ID
					onToggle={() => toggleService(service)} // Передаем объект service вместо selectedServices
				/>
			))}
		</page-services-group>
	);
};

export default ContentService;
