const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect'); // Путь к вашему файлу dbConnect может отличаться

router.get('/clients', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM clients');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No clients found' });
    }

    const clients = rows;
    res.json({
      message: 'Clients fetched successfully',
      employees: clients.map((client) => ({
        id: client.id,
        first_name: client.first_name,
        last_name: client.last_name,
        email: client.email,
        phone: client.phone,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
