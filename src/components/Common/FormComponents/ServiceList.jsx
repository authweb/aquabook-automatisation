import React from "react";
import ContentService from "../../Client/AppointmentForm/ContentService";

const ServiceList = ({
	categories,
	selectedServices,
	toggleService,
	onServiceSelect,
}) => {
	return (
		<div className="page-services-list">
			<div className="container">
				{categories.map(category => (
					<ContentService
						key={category.id}
						category={category}
						services={category.services}
						selectedServices={selectedServices}
						toggleService={toggleService}
					/>
				))}
			</div>

		</div>
	);
};

export default ServiceList;
