const express = require('express');
const router = express.Router();

const db = require('../src/config/dbConnect');

// Маршрут для получения конкретной записи по id
// Пример endpoint для обновления статуса оплаты записи
router.post('/appointments/:id/pay', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('UPDATE appointments SET is_paid = true WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Payment successful', is_paid: true });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
