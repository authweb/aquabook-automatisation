const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

const db = require('../src/config/dbConnect');

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Krasnoyarsk');

// Маршрут для получения конкретной записи по id
// Маршрут для получения конкретной записи по id
router.get('/appointments/:id', async (req, res) => {
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
        employee_first_name: se.employee_first_name // Включаем имя сотрудника
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

module.exports = router;

