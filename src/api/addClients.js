const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect'); // Путь к вашему файлу dbConnect может отличаться

router.post('/clients', async (req, res) => {
  const { first_name, last_name, phone, email } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO clients (first_name, last_name, phone, email) VALUES (?, ?, ?, ?)',
      [first_name, last_name, phone, email],
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Failed to create client' });
    }

    const clientId = result.insertId;
    res.status(201).json({
      message: 'Client created successfully',
      client: { id: clientId, first_name, last_name, phone, email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
