const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

const db = require('../config/dbConnect');

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Krasnoyarsk');

router.get('/appointments', async (_, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM appointments');
    const appointments = rows.map((appointment) => {
      const startInKrasnoyarsk = dayjs(appointment.start)
        .tz('Asia/Krasnoyarsk')
        .format('YYYY-MM-DD HH:mm:ss');
      const endInKrasnoyarsk = dayjs(appointment.end)
        .tz('Asia/Krasnoyarsk')
        .format('YYYY-MM-DD HH:mm:ss');

      return {
        id: appointment.id,
        start: startInKrasnoyarsk,
        end: endInKrasnoyarsk,
        selectedServices: appointment.selectedServices,
        serviceEmployeeMap: appointment.serviceEmployeeMap,
        text: appointment.text,
        clients_id: appointment.clients_id,
        totalCost: appointment.totalCost,
      };
    });

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
