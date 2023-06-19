const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect');

router.delete('/service-categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM service_categories WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service category not found' });
    }
    res.json({
      message: 'Service category deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
