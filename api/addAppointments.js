const express = require("express");
const router = express.Router();
const db = require('../src/config/dbConnect');

router.post("/appointments", async (req, res) => {
	console.log("Received POST request to /api/appointments");
	console.log("Request body:", req.body);

	const {
		start,
		end,
		text,
		clients_id,
		totalCost,
		selectedServices,
	} = req.body;

	const requiredFields = ['start', 'end', 'text', 'clients_id', 'totalCost'];
	const missingFields = requiredFields.filter(field => !(field in req.body));

	if (missingFields.length > 0) {
		console.log("Validation errors:", missingFields);
		return res.status(400).json({ errors: missingFields });
	}

	const connection = await db.getConnection();

	try {
		await connection.beginTransaction();

		const [appointmentResult] = await connection.execute(
			`INSERT INTO appointments2 (start, end, text, clients_id, totalCost) VALUES (?, ?, ?, ?, ?)`,
			[start, end, text, clients_id, totalCost]
		);
		const appointmentId = appointmentResult.insertId;
		console.log("Created appointment with ID:", appointmentId);

		for (const service of selectedServices) {
			const [insertResult] = await connection.execute(
				`INSERT INTO service_employee_map (appointment_id, service_id, employee_id) VALUES (?, ?, ?)`,
				[appointmentId, service.id, service.employee]
			);

			if (insertResult.affectedRows !== 1) {
				throw new Error(`Failed to insert mapping for service: ${service.id}`);
			}
		}

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
			},
		});
	} catch (error) {
		await connection.rollback();
		console.error("Error processing POST request to /api/appointments:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	} finally {
		connection.release();
	}
});

module.exports = router;
