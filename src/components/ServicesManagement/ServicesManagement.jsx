import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Table } from "antd";

import { HeaderDashboard } from "..";

const { TabPane } = Tabs;

const ServicesManagement = () => {
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState({});

	useEffect(() => {
		const fetchCategoriesAndServices = async () => {
			const categoriesResponse = await axios.get(
				"http://aqua-book:3306/api/service-categories",
			);
			const servicesResponse = await axios.get(
				"http://aqua-book:3306/api/services",
			);

			setCategories(categoriesResponse.data.servicesCategories);
			setServices(servicesResponse.data.services);
		};

		fetchCategoriesAndServices();
	}, []);

	// Определяем столбцы для таблицы
	const columns = [
		{
			title: "Название услуги",
			dataIndex: "name",
			key: "name",
			width: "20%",
		},
		{
			title: "Описание",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Цена от",
			dataIndex: "price_from",
			key: "price-from",
			width: "10%",
		},
		{
			title: "Цена до",
			dataIndex: "price_to",
			key: "price-to",
			width: "10%",
		},
	];

	if (!categories || !services) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Tabs type='card' tabPosition='left'>
				{categories.map(category => (
					<TabPane tab={category.name} key={category.id}>
						{services[category.id] && (
							<Table
								dataSource={services[category.id]}
								columns={columns}
								rowKey='id'
							/>
						)}
					</TabPane>
				))}
			</Tabs>
		</>
	);
};

export default ServicesManagement;
