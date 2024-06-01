import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";

const AppointmentsTable = ({ currentMonth, currentYear }) => {
	const [appointments, setAppointments] = useState([]);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://api.aqua-book.ru/api/appointments?month=${currentMonth + 1}&year=${currentYear}`,
				);
				const data = await response.json();
				const filteredAppointments = data.appointments
					.filter(appointment => {
						const date = new Date(appointment.start);
						return (
							date.getMonth() === currentMonth &&
							date.getFullYear() === currentYear
						);
					})
					.map((appointment, index) => ({
						...appointment,
						rowNumber: index + 1,
						start: new Date(appointment.start).toLocaleString(),
						end: new Date(appointment.end).toLocaleString(),
						client: appointment.client,
						is_paid: appointment.is_paid === 1 ? "Оплачено" : "Не оплачено",
						services: appointment.servicesEmployees.map(se => se.service_name).join(", "), // Преобразование в строку
						employees: appointment.servicesEmployees.map(se => se.employee_name).join(", "), // Преобразование в строку
					}));
				setAppointments(filteredAppointments);
			} catch (error) {
				console.error("Error fetching appointments:", error);
			}
		};

		fetchData();
	}, [currentMonth, currentYear]);

	const handleSearch = e => {
		setSearchText(e.target.value.toLowerCase());
	};

	const filteredAppointments = appointments.filter(appointment => {
		const searchTarget =
			`${appointment.services} ${appointment.text} ${appointment.start} ${appointment.end} ${appointment.employees} ${appointment.is_paid}`.toLowerCase();
		return searchTarget.includes(searchText);
	});

	const columns = [
		{
			title: "Номер заказа",
			dataIndex: "rowNumber",
			key: "rowNumber",
		},
		{
			title: "Начало",
			dataIndex: "start",
			key: "start",
		},
		{
			title: "Конец",
			dataIndex: "end",
			key: "end",
		},
		{
			title: "Клиент",
			dataIndex: "client",
			key: "client",
		},
		{
			title: "Выбранные услуги",
			dataIndex: "services",
			key: "services",
		},
		{
			title: "Выбранный сотрудник",
			dataIndex: "employees",
			key: "employees",
		},
		{
			title: "Сумма",
			dataIndex: "totalCost",
			key: "totalCost",
			sorter: (a, b) => a.totalCost - b.totalCost,
		},
		{
			title: "Состояние оплаты",
			dataIndex: "is_paid",
			key: "is_paid",
			filters: [
				{ text: "Оплачено", value: "Оплачено" },
				{ text: "Не оплачено", value: "Не оплачено" },
			],
			onFilter: (value, record) => record.is_paid.includes(value),
		},
	];

	const onChange = (pagination, filters, sorter, extra) => {
		console.log("params", pagination, filters, sorter, extra);
	};

	return (
		<>
			<Input
				placeholder='Поиск по записям'
				onChange={handleSearch}
				className="mb-4 mt-2 p-2 border rounded w-full md:w-1/2"
			/>
			<div className="overflow-x-auto mb-4">
				<Table
					dataSource={filteredAppointments}
					columns={columns}
					rowKey='id'
					onChange={onChange}
					pagination={{ pageSize: 10 }}
					scroll={{ x: 800 }}
					className="w-full"
				/>
			</div>
		</>
	);
};

export default AppointmentsTable;
