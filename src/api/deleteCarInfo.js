const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect');

router.delete('/deletecarinfo', async (req, res) => {
  const { clients_id } = req.body;

  try {
    await db.execute('DELETE FROM car_info WHERE clients_id = ?', [clients_id]);

    res.json({ message: 'Car information deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
