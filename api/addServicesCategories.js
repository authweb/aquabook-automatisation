const express = require('express');
const router = express.Router();
const db = require('../src/config/dbConnect');

router.post('/service-categories', async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO services_categories (name, description) VALUES (?, ?)',
      [name, description],
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Failed to add service category' });
    }
    res.json({
      message: 'Service category added successfully',
      serviceCategory: {
        id: result.insertId,
        name,
        description,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
