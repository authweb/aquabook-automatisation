const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect'); // Путь к вашему файлу dbConnect может отличаться

router.get('/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM employees WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const employee = rows[0];
    res.json({
      message: 'Employee fetched successfully',
      employee: {
        id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone,
        access: employee.access,
        user_id: employee.user_id,
        gender: employee.gender,
        description: employee.description,
        position: employee.position,
        is_bookable: employee.is_bookable,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
