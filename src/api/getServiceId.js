const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect'); // Путь к вашему файлу dbConnect может отличаться

router.get('/services/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM services WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const service = rows[0];
    res.json({
      message: 'Service fetched successfully',
      service: {
        id: service.id,
        name: service.name,
        description: service.description,
        price_from: service.price_from,
        price_to: service.price_to,
        tags: service.tags,
        duration: service.duration,
        // и другие поля, если они есть
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
