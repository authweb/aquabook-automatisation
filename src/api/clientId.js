const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect'); // Путь к вашему файлу dbConnect может отличаться

// Предполагается, что у вас уже есть подключение к базе данных `db`
router.get('/clients/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM clients WHERE id = ?', [id]);
    const client = rows[0];

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({
      message: 'Client fetched successfully',
      client,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
