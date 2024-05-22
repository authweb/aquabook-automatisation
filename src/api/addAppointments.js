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

	console.log("Полученные данные:", req.body);

	const errors = [];

	if (start === undefined) {
		errors.push("start is missing");
	}

	if (end === undefined) {
		errors.push("end is missing");
	}

	if (text === undefined) {
		errors.push("text is missing");
	}

	if (typeof totalCost !== "number") {
		errors.push("totalCost should be a number");
	}

	if (typeof clients_id !== "number") {
		errors.push("clients_id should be a number");
	}

	if (errors.length > 0) {
		// Если есть ошибки, отправьте их в ответе
		return res.status(400).json({ errors });
	}

	try {
		// Добавляем новую запись с новыми столбцами
		const [appointmentResult] = await db.execute(
			"INSERT INTO appointments (start, end, selectedServices, serviceEmployeeMap, text, clients_id, totalCost) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[
				start,
				end,
				JSON.stringify(selectedServices), // Преобразуем в JSON-строку
				JSON.stringify(serviceEmployeeMap), // Преобразуем в JSON-строку
				text,
				clients_id,
				totalCost,
			],
		);

		if (appointmentResult.affectedRows === 0) {
			return res.status(400).json({ message: "Failed to create appointment" });
		}

		const appointmentId = appointmentResult.insertId;
		res.status(201).json({
			message: "Appointment created successfully",
			appointment: {
				id: appointmentId,
				start,
				end,
				selectedServices,
				serviceEmployeeMap,
				text,
				clients_id,
				totalCost,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
