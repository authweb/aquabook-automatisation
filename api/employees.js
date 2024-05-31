const express = require('express');
const router = express.Router();
const db = require('../src/config/dbConnect');

router.get('/employees', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM employees');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }

    const employees = rows;
    res.json({
      message: 'Employees fetched successfully',
      employees: employees.map((employee) => ({
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
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
