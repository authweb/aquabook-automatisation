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

	try {
		// Начинаем транзакцию
		await db.beginTransaction();

		// Добавляем новую запись в таблицу appointments
		const [appointmentResult] = await db.execute(
			"INSERT INTO appointments (start, end, text, clients_id, totalCost) VALUES (?, ?, ?, ?, ?)",
			[start, end, text, clients_id, totalCost],
		);

		if (appointmentResult.affectedRows === 0) {
			await db.rollback();
			return res.status(400).json({ message: "Failed to create appointment" });
		}

		const appointmentId = appointmentResult.insertId;

		// Добавляем записи в таблицу service_employee_map
		for (const { service_id, employee_id } of serviceEmployeeMap) {
			await db.execute(
				"INSERT INTO service_employee_map (appointment_id, service_id, employee_id) VALUES (?, ?, ?)",
				[appointmentId, service_id, employee_id],
			);
		}

		// Фиксируем транзакцию
		await db.commit();

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
		// Откат транзакции в случае ошибки
		await db.rollback();
		console.error(error);
		res.status(500).json({ message: "Server error" });
	} finally {
		// Закрываем соединение
		await db.close();
	}
});

module.exports = router;
