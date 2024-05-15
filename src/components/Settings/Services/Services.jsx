import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContexts";
import axios from "axios";
import { HeaderDashboard } from "../../../components";
import "../../../scss/profile.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { Table, Tag } from "antd";

const Services = () => {
	const { users } = useAuth();
	const navigate = useNavigate();

	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState({});
	const [flatServices, setFlatServices] = useState([]); // новое состояние для хранения всех услуг

	useEffect(() => {
		const fetchServices = async () => {
			const categoriesResponse = await axios.get(
				"http://localhost:3306/api/service-categories",
			);
			const servicesResponse = await axios.get(
				"http://localhost:3306/api/services",
			);

			setCategories(categoriesResponse.data.servicesCategories);
			setServices(servicesResponse.data.services);
		};

		fetchServices();
	}, []);

	useEffect(() => {
		// создаем плоский массив услуг из всех категорий
		const allServices = Object.values(services).reduce(
			(acc, categoryServices) => {
				return acc.concat(categoryServices);
			},
			[],
		);
		setFlatServices(allServices); // обновляем состояние flatServices
	}, [services]); // этот useEffect будет вызван каждый раз, когда обновляется состояние services

	const columns = [
		{
			title: "Название услуги",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Цена",
			dataIndex: "price_from",
			key: "price-from",
		},
		{
			title: "Длительность",
			dataIndex: "duration",
			key: "duration",
		},
		{
			title: "Статус",
			dataIndex: "tags",
			key: "tags",
			render: tag => {
				let color =
					tag === "Включено"
						? "green"
						: tag === "Выключено"
						? "volcano"
						: "gray";
				return <Tag color={color}>{tag}</Tag>;
			},
		},
	];
	console.log(services);

	return (
		<>
			<HeaderDashboard
				showBack
				title='Услуги'
				buttons='Создать услугу'
				to='add'
			/>
			<div className='ab-page__content'>
				<div className='container pt-6'>
					<div className='flex flex-wrap items-center'>
						<div className='mb-4 mr-4 max-w-full'>
							<div className='ab-slider ab-button-nav ab-button-nav__wrapper'>
								<span className='ab-slider__scroller'>
									<a
										href='#'
										className='ab-button-nav__toggler ab-button-nav__toggler_active'>
										<span tabIndex={-1}>Активные</span>
									</a>
									<a href='#' className='ab-button-nav__toggler'>
										<span tabIndex={-1}>Все</span>
									</a>
								</span>
							</div>
						</div>
						<div className='mb-4 flex-grow flex justify-end'>
							<label
								htmlFor='input-74'
								className='flex ab-search w-full ab-text-field is-text has-icon'>
								<div className='relative w-full'>
									<input
										type='text'
										autoComplete='off'
										placeholder='Поиск'
										className='ab-text-field__element p-2'
										id='input-74'
									/>
									<span className='ab-text-field__icon'>
										<SearchOutlined className='ab-icon ab-search__icon-default h-full w-10 p-3 ab-icon--size-text' />
									</span>
								</div>
							</label>
						</div>
					</div>
					<Table
						className='ab-table'
						dataSource={flatServices}
						columns={columns}
						rowKey='id'
						onRow={service => ({
							onClick: () => {
								navigate(`${service.id}`);
							},
						})}
						rowClassName={() => "cursor-pointer"}
					/>
				</div>
			</div>
		</>
	);
};

export default Services;
