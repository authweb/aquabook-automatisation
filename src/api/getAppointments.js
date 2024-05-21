const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

const db = require("../config/dbConnect");

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Krasnoyarsk");

router.get("/appointments", async (req, res) => {
	try {
		const [rows] = await db.execute(`
      SELECT a.id as appointment_id, a.start, a.end, c.id as client_id, c.first_name, c.last_name, c.phone, c.email,
             s.id as service_id, s.name as service_name, e.id as employee_id, e.first_name as employee_first_name, e.last_name as employee_last_name
      FROM appointments a
      JOIN clients c ON a.clients_id = c.id
      JOIN service_employee_map sem ON a.id = sem.appointment_id
      JOIN services s ON sem.service_id = s.id
      JOIN employees e ON sem.employee_id = e.id
    `);

		const appointments = rows.reduce((acc, row) => {
			const {
				appointment_id,
				start,
				end,
				client_id,
				first_name,
				last_name,
				phone,
				email,
				service_id,
				service_name,
				employee_id,
				employee_first_name,
				employee_last_name,
			} = row;

			const appointment = acc[appointment_id] || {
				id: appointment_id,
				start,
				end,
				client: {
					id: client_id,
					first_name,
					last_name,
					phone,
					email,
				},
				services: [],
			};

			appointment.services.push({
				id: service_id,
				name: service_name,
				employee: {
					id: employee_id,
					first_name: employee_first_name,
					last_name: employee_last_name,
				},
			});

			acc[appointment_id] = appointment;

			return acc;
		}, {});

		res.json({
			message: "Appointments fetched successfully",
			appointments: Object.values(appointments),
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
