const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect');

router.get('/appointments', async (_, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM appointments');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No appointments found' });
    }

    const appointments = rows;
    res.json({
      message: 'Appointments fetched successfully',
      appointments: appointments.map((appointment) => ({
        id: appointment.id,
        start: appointment.start,
        end: appointment.end,
        text: appointment.text,
        resource: appointment.resource,
        clients_id: appointment.clients_id,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
