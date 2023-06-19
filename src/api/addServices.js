const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect');

router.post('/services', async (req, res) => {
  const { category_id, name, description, price } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO services (category_id, name, description, price) VALUES (?, ?, ?, ?)',
      [category_id, name, description, price],
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Failed to add service' });
    }
    res.json({
      message: 'Service added successfully',
      service: {
        id: result.insertId,
        category_id,
        name,
        description,
        price,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
