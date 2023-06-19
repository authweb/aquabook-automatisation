const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect');

router.get('/services', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM services');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No services found' });
    }

    const services = rows.reduce((acc, service) => {
      if (!acc[service.category_id]) {
        acc[service.category_id] = [];
      }
      acc[service.category_id].push(service);
      return acc;
    }, {});

    res.json({
      message: 'Services fetched successfully',
      services,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
