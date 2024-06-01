import React, { useEffect, useState } from "react";
import axios from "axios";
import { HeaderDashboard } from "..";

const ServicesManagement = () => {
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState({});
	const [activeTab, setActiveTab] = useState(null);

	useEffect(() => {
		const fetchCategoriesAndServices = async () => {
			const categoriesResponse = await axios.get(
				"https://api.aqua-book.ru/api/service-categories"
			);
			const servicesResponse = await axios.get(
				"https://api.aqua-book.ru/api/services"
			);

			setCategories(categoriesResponse.data.servicesCategories);
			setServices(servicesResponse.data.services);
			if (categoriesResponse.data.servicesCategories.length > 0) {
				setActiveTab(categoriesResponse.data.servicesCategories[0].id);
			}
		};

		fetchCategoriesAndServices();
	}, []);

	if (!categories || !services) {
		return <div>Loading...</div>;
	}

	return (
		<div className="p-4 space-y-6">
			<HeaderDashboard showBack title="Просмотр услуг" />
			<div className="bg-card p-4 rounded-lg shadow-md">
				<div className="flex flex-col md:flex-row">
					<div className="flex md:flex-col overflow-x-auto">
						{categories.map((category) => (
							<button
								key={category.id}
								className={`p-2 text-left ${activeTab === category.id ? "bg-gray-300 text-gray-900 rounded-lg" : ""
									}`}
								onClick={() => setActiveTab(category.id)}
							>
								{category.name}
							</button>
						))}
					</div>
					<div className="flex-1 p-4">
						{categories.map((category) => (
							<div
								key={category.id}
								className={`${activeTab === category.id ? "block" : "hidden"}`}
							>
								{services[category.id] && (
									<div className="overflow-x-auto">
										<table className="min-w-full bg-card">
											<thead>
												<tr>
													<th className="py-2 px-4 border border-slate-400 w-1/5">Название услуги</th>
													<th className="py-2 px-4 border border-slate-400 w-2/5">Описание</th>
													<th className="py-2 px-4 border border-slate-400 w-1/5">Цена от</th>
													<th className="py-2 px-4 border border-slate-400 w-1/5">Цена до</th>
												</tr>
											</thead>
											<tbody>
												{services[category.id].map((service) => (
													<tr key={service.id}>
														<td className="py-2 px-4 border border-slate-700">{service.name}</td>
														<td className="py-2 px-4 border border-slate-700">{service.description}</td>
														<td className="py-2 px-4 border border-slate-700 text-center">{service.price_from}</td>
														<td className="py-2 px-4 border border-slate-700 text-center">{service.price_to}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServicesManagement;
