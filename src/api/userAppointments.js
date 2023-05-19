const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect');

router.get('/myappointments/', async (req, res) => {
  const clients_id = req.params.clients_id;

  try {
    // Execute SQL query to fetch user's appointments
    const [rows] = await db.execute('SELECT * FROM appointments WHERE clients_id = ?', [
      clients_id,
    ]);

    // Return the fetched appointments
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
