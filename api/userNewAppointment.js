const express = require('express');
const router = express.Router();
const db = require('../src/config/dbConnect');

router.post('/newappointment', async (req, res) => {
  const { clients_id, car_id, service_id, appointment_date } = req.body;

  try {
    // Execute SQL query to insert new appointment
    const [result] = await db.execute(
      'INSERT INTO appointments (clients_id, car_id, service_id, appointment_date) VALUES (?, ?, ?, ?)',
      [clients_id, car_id, service_id, appointment_date],
    );

    // Check if the insertion was successful
    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'New appointment created successfully' });
    } else {
      res.status(500).json({ message: 'Failed to create new appointment' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
