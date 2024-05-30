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
router.get('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM appointments2 WHERE id = ?', [id]);
    const appointment = rows[0];

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({
      message: 'Appointment fetched successfully',
      appointment: {
        ...appointment,
        is_paid: appointment.is_paid // Убедитесь, что это поле возвращается
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
