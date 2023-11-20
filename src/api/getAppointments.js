const express = require('express');
const router = express.Router();
const moment = require('moment');
const db = require('../config/dbConnect');

router.get('/appointments', async (_, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM appointments');
    const appointments = rows.map((appointment) => ({
      id: appointment.id,
      start: moment(appointment.start).format('YYYY-MM-DD HH:mm:ss'),
      end: moment(appointment.end).format('YYYY-MM-DD HH:mm:ss'),
      selectedServices: appointment.selectedServices,
      serviceEmployeeMap: appointment.serviceEmployeeMap,
      text: appointment.text,
      clients_id: appointment.clients_id,
      totalCost: appointment.totalCost,
    }));

    if (appointments.length === 0) {
      // Если нет записей, вернем пустой массив
      return res.json({
        message: 'No appointments found',
        appointments: [],
      });
    }

    res.json({
      message: 'Appointments fetched successfully',
      appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
