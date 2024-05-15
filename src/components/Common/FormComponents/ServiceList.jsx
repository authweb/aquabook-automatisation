import React from "react";
import ContentService from "../../Client/AppointmentForm/ContentService";

const ServiceList = ({
	categories,
	selectedServices,
	toggleService,
	onServiceSelect,
}) => {
	return (
		<page-services-list>
			{categories.map(category => (
				<ContentService
					key={category.id}
					category={category}
					services={category.services}
					selectedServices={selectedServices}
					toggleService={toggleService}
					// isScrolling={isScrolling}
				/>
			))}
		</page-services-list>
	);
};

export default ServiceList;
