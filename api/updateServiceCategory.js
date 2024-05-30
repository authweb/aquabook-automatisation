const express = require('express');
const router = express.Router();
const db = require('../src/config/dbConnect');

router.put('/service-categories/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { description } = req.body;
  try {
    const [result] = await db.execute(
      'UPDATE service_categories SET name = ?, description = ? WHERE id = ?',
      [name, id, description],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service category not found' });
    }
    res.json({
      message: 'Service category updated successfully',
      serviceCategory: {
        id,
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
