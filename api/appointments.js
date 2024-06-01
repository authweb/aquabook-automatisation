const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const db = require('../src/config/dbConnect');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Krasnoyarsk");

// Получить все записи
router.get("/appointments", async (req, res) => {
    try {
        const [appointments] = await db.execute(`
            SELECT a.*, c.first_name AS client_first_name, c.last_name AS client_last_name 
            FROM appointments2 a
            LEFT JOIN clients c ON a.clients_id = c.id
        `);
        const [servicesEmployees] = await db.execute(`
            SELECT 
                ase.appointment_id, 
                s.name AS service_name, 
                e.id AS employee_id,
                e.first_name AS employee_name
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
                client: `${appointment.client_first_name} ${appointment.client_last_name}`,
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
                    employee_id: se.employee_id,
                    employee_name: se.employee_name
                });
            }
        });

        const appointmentsArray = Object.values(appointmentsMap);

        res.json({
            message: "Appointments fetched successfully",
            appointments: appointmentsArray.length ? appointmentsArray : [],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Получить запись по ID
router.get("/appointments/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM appointments2 WHERE id = ?', [id]);
        const appointment = rows[0];

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const [servicesEmployees] = await db.execute(`
            SELECT 
                ase.appointment_id, 
                s.name AS service_name, 
                e.id AS employee_id,
                e.first_name AS employee_first_name
            FROM 
                service_employee_map ase
            JOIN 
                services s ON ase.service_id = s.id
            JOIN 
                employees e ON ase.employee_id = e.id
            WHERE 
                ase.appointment_id = ?
        `, [id]);

        const startInKrasnoyarsk = dayjs(appointment.start)
            .tz('Asia/Krasnoyarsk')
            .format('YYYY-MM-DD HH:mm:ss');
        const endInKrasnoyarsk = dayjs(appointment.end)
            .tz('Asia/Krasnoyarsk')
            .format('YYYY-MM-DD HH:mm:ss');

        const appointmentDetails = {
            id: appointment.id,
            start: startInKrasnoyarsk,
            end: endInKrasnoyarsk,
            text: appointment.text,
            clients_id: appointment.clients_id,
            totalCost: appointment.totalCost,
            is_paid: appointment.is_paid,
            servicesEmployees: servicesEmployees.map(se => ({
                service_name: se.service_name,
                employee_id: se.employee_id,
                employee_first_name: se.employee_first_name
            }))
        };

        res.json({
            message: 'Appointment fetched successfully',
            appointment: appointmentDetails
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Создать новую запись
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

// Обновить запись по ID
router.put("/appointments/:id", async (req, res) => {
    const { id } = req.params;
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
            `UPDATE appointments2 SET start = ?, end = ?, text = ?, clients_id = ?, totalCost = ? WHERE id = ?`,
            [start, end, text, clients_id, totalCost, id]
        );

        if (appointmentResult.affectedRows !== 1) {
            throw new Error(`Failed to update appointment with ID: ${id}`);
        }

        await connection.execute(
            `DELETE FROM service_employee_map WHERE appointment_id = ?`,
            [id]
        );

        for (const service of selectedServices) {
            const [insertResult] = await connection.execute(
                `INSERT INTO service_employee_map (appointment_id, service_id, employee_id) VALUES (?, ?, ?)`,
                [id, service.id, service.employee]
            );

            if (insertResult.affectedRows !== 1) {
                throw new Error(`Failed to insert mapping for service: ${service.id}`);
            }
        }

        await connection.commit();

        res.status(200).json({
            message: "Appointment updated successfully",
            appointment: {
                id,
                start,
                end,
                text,
                clients_id,
                totalCost,
            },
        });
    } catch (error) {
        await connection.rollback();
        console.error("Error processing PUT request to /api/appointments:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    } finally {
        connection.release();
    }
});

// Удалить запись по ID
router.delete("/appointments/:id", async (req, res) => {
    const { id } = req.params;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        await connection.execute(
            `DELETE FROM service_employee_map WHERE appointment_id = ?`,
            [id]
        );

        const [appointmentResult] = await connection.execute(
            `DELETE FROM appointments2 WHERE id = ?`,
            [id]
        );

        if (appointmentResult.affectedRows !== 1) {
            throw new Error(`Failed to delete appointment with ID: ${id}`);
        }

        await connection.commit();

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        await connection.rollback();
        console.error("Error processing DELETE request to /api/appointments:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    } finally {
        connection.release();
    }
});

router.post("/appointments/:id/pay", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('UPDATE appointments2 SET is_paid = true WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Payment successful', is_paid: true });
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
