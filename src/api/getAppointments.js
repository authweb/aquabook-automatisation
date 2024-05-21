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
			SELECT 
			a.id AS appointment_id, 
			a.start, 
			a.end, 
			a.selectedServices, 
			a.serviceEmployeeMap, 
			a.text, 
			a.totalCost, 
			a.clients_id AS client_id, 
			a.is_paid,
			c.first_name,
			c.last_name,
			c.phone,
			c.email,
			s.id AS service_id,
			s.name AS service_name,
			e.id AS employee_id,
			e.first_name AS employee_first_name,
			e.last_name AS employee_last_name
		FROM 
			appointments a 
		JOIN 
			clients c ON a.clients_id = c.id 
		JOIN 
			service_employee_map sem ON a.id = sem.appointment_id 
		JOIN 
			services s ON sem.service_id = s.id 
		JOIN 
			employees e ON sem.employee_id = e.id;
        `);

		const appointments = rows.reduce((acc, row) => {
			const {
				appointment_id,
				start,
				end,
				clients_id,
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
					id: clients_id,
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
