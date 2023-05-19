const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect');

router.post('/updatecarinfo', async (req, res) => {
  const { clients_id, car_number, car_make, car_model, car_type } = req.body;

  try {
    // Проверяем, существует ли уже запись о машине для данного клиента
    const [existingRows] = await db.execute('SELECT * FROM car_info WHERE clients_id = ?', [
      clients_id,
    ]);

    if (existingRows.length > 0) {
      // Если запись существует, обновляем данные
      await db.execute(
        'UPDATE car_info SET car_number = ?, car_make = ?, car_model = ?, car_type = ? WHERE clients_id = ?',
        [car_number, car_make, car_model, car_type, clients_id],
      );
    } else {
      // Если запись не существует, создаем новую
      await db.execute(
        'INSERT INTO car_info (clients_id, car_number, car_make, car_model, car_type) VALUES (?, ?, ?, ?, ?)',
        [clients_id, car_number, car_make, car_model, car_type],
      );
    }

    res.json({
      message: 'Car information saved successfully',
      clients_id: clients_id,
      car_number: car_number,
      car_make: car_make,
      car_model: car_model,
      car_type: car_type,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
