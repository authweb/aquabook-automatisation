// addAppointments.js
const express = require("express");
const router = express.Router();
const db = require("../config/dbConnect");

router.post("/appointments", async (req, res) => {
	const {
		start,
		end,
		text,
		clients_id,
		selectedServices,
		serviceEmployeeMap,
		totalCost,
	} = req.body;

	if (
		!start ||
		!end ||
		!selectedServices ||
		!serviceEmployeeMap ||
		!text ||
		!totalCost ||
		!clients_id
	) {
		return res.status(400).json({ message: "Все поля должны быть заполнены" });
	}

	let connection;

	try {
		// Получаем соединение из пула
		connection = await db.getConnection();

		// Начинаем транзакцию
		await connection.beginTransaction();

		// Добавляем новую запись в таблицу appointments
		const [appointmentResult] = await connection.execute(
			"INSERT INTO appointments (start, end, text, clients_id, totalCost) VALUES (?, ?, ?, ?, ?)",
			[start, end, text, clients_id, totalCost],
		);

		if (appointmentResult.affectedRows === 0) {
			await connection.rollback();
			return res.status(400).json({ message: "Failed to create appointment" });
		}

		const appointmentId = appointmentResult.insertId;

		// Добавляем записи в таблицу service_employee_map
		for (const { service_id, employee_id } of serviceEmployeeMap) {
			await connection.execute(
				"INSERT INTO service_employee_map (appointment_id, service_id, employee_id) VALUES (?, ?, ?)",
				[appointmentId, service_id, employee_id],
			);
		}

		// Фиксируем транзакцию
		await connection.commit();

		res.status(201).json({
			message: "Appointment created successfully",
			appointment: {
				id: appointmentId,
				start,
				end,
				text,
				clients_id,
				totalCost,
				serviceEmployeeMap,
			},
		});
	} catch (error) {
		if (connection) {
			// Откат транзакции в случае ошибки
			await connection.rollback();
		}
		console.error(error);
		res.status(500).json({ message: "Server error" });
	} finally {
		if (connection) {
			// Освобождаем соединение
			connection.release();
		}
	}
});

module.exports = router;
