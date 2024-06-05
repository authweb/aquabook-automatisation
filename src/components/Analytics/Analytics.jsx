import React, { useState, useEffect, useCallback } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
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

	const fetchData = useCallback(async (month, year) => {
		try {
			const response = await fetch(
				`https://api.aqua-book.ru/api/appointments?month=${month + 1}&year=${year}`,
			);
			const data = await response.json();
			const appointmentsForMonth = data.appointments.filter(appointment => {
				const appointmentDate = new Date(appointment.start);
				return (
					appointmentDate.getMonth() === month &&
					appointmentDate.getFullYear() === year
				);
			});
			setAppointments(data.appointments);
			setTotalAppointments(appointmentsForMonth.length);
			setTotalCompleted(
				appointmentsForMonth.filter(appointment => appointment.is_paid).length,
			);

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

			const paidAppointments = appointmentsForMonth.filter(a => a.is_paid).length;
			const unpaidAppointments = appointmentsForMonth.length - paidAppointments;

			setPieData([
				{ name: "Оплачено", value: paidAppointments },
				{ name: "Не оплачено", value: unpaidAppointments },
			]);
		} catch (error) {
			console.error("Error fetching appointments:", error);
		}
	}, []);

	useEffect(() => {
		fetchData(currentMonth, currentYear);
	}, [currentMonth, currentYear, fetchData]);

	const formattedPieData = Object.values(pieData);

	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

	return (
		<div className="container p-4 mx-auto mb-8">
			<AnalyticsHeader
				currentMonth={currentMonth}
				currentYear={currentYear}
				onMonthChange={handleMonthChange}
				totalAppointments={totalAppointments}
				totalCompleted={totalCompleted}
			/>
			<div className="flex flex-col lg:flex-row lg:justify-between mt-6">
				<div className="w-full lg:w-2/3 mb-6 lg:mb-0">
					<ResponsiveContainer width="100%" height={300}>
						<BarChart
							width="600"
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
					</ResponsiveContainer>
				</div>
				<div className="w-full lg:w-1/3">
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={formattedPieData}
								cx='50%'
								cy='50%'
								labelLine={false}
								label={({ percent }) =>
									`${(percent * 100).toFixed(0)}%`
								}
								outerRadius={100}
								fill='#8884d8'
								dataKey='value'
								>
								{formattedPieData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
			<AppointmentsTable
				appointments={appointments}
				currentMonth={currentMonth}
				currentYear={currentYear}
			/>
		</div>
	);
};

export default Analytics;
