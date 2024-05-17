import React, { useState, useEffect } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import { AnalyticsHeader, AppointmentsTable } from "../";

const Analytics = () => {
	const [appointments, setAppointments] = useState([]);
	const [barData, setBarData] = useState([]);
	const [pieData, setPieData] = useState([]);

	const [totalAppointments, setTotalAppointments] = useState(0);
	const [totalCompleted, setTotalCompleted] = useState(0);

	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

	const handleMonthChange = (newMonth, newYear) => {
		setCurrentMonth(newMonth);
		setCurrentYear(newYear);
	};

	useEffect(() => {
		fetchData(currentMonth, currentYear);
	}, [currentMonth, currentYear]);

	// Функция для получения данных с сервера
	const fetchData = async (month, year) => {
		try {
			// Убедитесь, что ваш API поддерживает эти параметры или настройте их в соответствии с вашим API
			const response = await fetch(
				`http://api.aqua-book.ru/api/appointments?month=${
					month + 1
				}&year=${year}`,
			);
			const data = await response.json();
			const appointmentsForMonth = data.appointments.filter(appointment => {
				const appointmentDate = new Date(appointment.start);
				return (
					appointmentDate.getMonth() === month &&
					appointmentDate.getFullYear() === year
				);
			});
			setAppointments(appointments);
			// Обновляем общее количество записей и количество выполненных записей
			setTotalAppointments(appointmentsForMonth.length);
			setTotalCompleted(
				appointmentsForMonth.filter(appointment => appointment.is_paid).length,
			);

			// Обрабатываем данные для BarChart
			const daysInMonth = new Date(year, month + 1, 0).getDate();
			const barDataArray = new Array(daysInMonth).fill(null).map((_, index) => {
				return { date: index + 1, "Записей всего": 0, Выполнено: 0 };
			});

			appointmentsForMonth.forEach(appointment => {
				const date = new Date(appointment.start).getDate();
				barDataArray[date - 1]["Записей всего"] += 1;
				if (appointment.is_paid) {
					barDataArray[date - 1]["Выполнено"] += 1;
				}
			});

			setBarData(barDataArray);

			// Подготовка данных для PieChart
			const paidAppointments = appointmentsForMonth.filter(
				a => a.is_paid,
			).length;
			const unpaidAppointments = appointmentsForMonth.length - paidAppointments;

			setPieData([
				{ name: "Оплачено", value: paidAppointments },
				{ name: "Не оплачено", value: unpaidAppointments },
			]);
		} catch (error) {
			console.error("Error fetching appointments:", error);
			// Обработка ошибок, например, установка состояния ошибки или отображение уведомления
		}
	};

	// Преобразование объектов в массивы для использования в диаграммах
	// const formattedBarData = Object.values(barData);
	const formattedPieData = Object.values(pieData);

	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Цвета для круговой диаграммы

	return (
		<div>
			<AnalyticsHeader
				currentMonth={currentMonth}
				currentYear={currentYear}
				onMonthChange={handleMonthChange}
				totalAppointments={totalAppointments}
				totalCompleted={totalCompleted}
			/>
			<BarChart
				width={1000}
				height={300}
				data={barData}
				margin={{
					top: 20,
					left: 20,
					bottom: 5,
				}}>
				<XAxis dataKey='date' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey='Записей всего' fill='#8884d8' />
				<Bar dataKey='Выполнено' fill='#82ca9d' />
			</BarChart>
			<PieChart width={600} height={300}>
				<Pie
					data={formattedPieData}
					cx='50%'
					cy='50%'
					labelLine={false}
					label={({ name, percent }) =>
						`${name}: ${(percent * 100).toFixed(0)}%`
					}
					outerRadius={100}
					fill='#8884d8'
					dataKey='value'>
					{formattedPieData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
			<AppointmentsTable
				appointments={appointments}
				currentMonth={currentMonth}
				currentYear={currentYear}
			/>
		</div>
	);
};
export default Analytics;
