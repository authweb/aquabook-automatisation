const express = require('express');
const router = express.Router();
const db = require('../src/config/dbConnect');

router.put('/services/:id', async (req, res) => {
  const { id } = req.params;
  const { category_id, name, description, price } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE services SET category_id = ?, name = ?, description = ?, price = ? WHERE id = ?',
      [category_id, name, description, price, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
