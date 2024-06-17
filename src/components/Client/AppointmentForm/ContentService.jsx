import React from "react";
import ServiceCard from "../../Common/FormComponents/ServiceCard";

const ContentService = ({
	category,
	services,
	selectedServices,
	toggleService,
	isScrolling,
}) => {
	if (!category) {
		return <div>Loading...</div>;
	}

	return (
		<div className='page-services-group inner-container' id={`category-${category.id}`}>
			<h2 className='label category-title'>{category.name}</h2>

			{services?.map(service => (
				<ServiceCard
					key={service.id}
					service={service}
					isSelected={selectedServices.some(s => s.id === service.id)}
					onToggle={() => toggleService(service)}
				/>
			))}
		</div>
	);
};

export default ContentService;
