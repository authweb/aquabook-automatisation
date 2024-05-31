const express = require('express');
const router = express.Router();
const db = require('../src/config/dbConnect');

router.post('/services', async (req, res) => {
  let { category_id, name, description, price_from, price_to, tags, duration } = req.body;

  if (!category_id || !Number.isInteger(Number(category_id))) {
    return res.status(400).send("Invalid category_id");
  }

  category_id = category_id || 0;
  name = name || '';
  description = description || '';
  price_from = price_from || 0;
  price_to = price_to || 0;
  tags = tags || '';
  duration = duration || 0;

  try {
    const [result] = await db.execute(
      'INSERT INTO services (category_id, name, description, price_from, price_to, tags, duration) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [category_id, name, description, price_from, price_to, tags, duration],
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
        price_from,
        price_to,
        tags,
        duration,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
