const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

const db = require('../src/config/dbConnect');
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Krasnoyarsk");

router.get("/appointments", async (_, res) => {
	try {
		const [appointments] = await db.execute("SELECT * FROM appointments2");
		const [servicesEmployees] = await db.execute(`
			SELECT 
			ase.appointment_id, 
			s.name AS service_name, 
			e.id AS employee_id
		FROM 
			service_employee_map ase
		JOIN 
			services s ON ase.service_id = s.id
		JOIN 
			employees e ON ase.employee_id = e.id
		`);

		const appointmentsMap = appointments.reduce((map, appointment) => {
			const startInKrasnoyarsk = dayjs(appointment.start)
				.tz("Asia/Krasnoyarsk")
				.format("YYYY-MM-DD HH:mm:ss");
			const endInKrasnoyarsk = dayjs(appointment.end)
				.tz("Asia/Krasnoyarsk")
				.format("YYYY-MM-DD HH:mm:ss");

			map[appointment.id] = {
				id: appointment.id,
				start: startInKrasnoyarsk,
				end: endInKrasnoyarsk,
				text: appointment.text,
				clients_id: appointment.clients_id,
				totalCost: appointment.totalCost,
				is_paid: appointment.is_paid,
				servicesEmployees: []
			};
			return map;
		}, {});

		servicesEmployees.forEach(se => {
			if (appointmentsMap[se.appointment_id]) {
				appointmentsMap[se.appointment_id].servicesEmployees.push({
					service_name: se.service_name,
					employee_id: se.employee_id  // Включаем employee_id
				});
			}
		});

		const appointmentsArray = Object.values(appointmentsMap);

		console.log("Appointments from DB:", appointmentsArray);

		if (appointmentsArray.length === 0) {
			return res.json({
				message: "No appointments found",
				appointments: [],
			});
		}

		res.json({
			message: "Appointments fetched successfully",
			appointments: appointmentsArray,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
