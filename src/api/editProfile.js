const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect');

router.put('/profile/:id', async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const {
    first_name,
    last_name,
    phone,
    email,
    gender,
    description = null,
    position,
    user_role_id = '1',
  } = req.body;

  const user_id = id;

  const missingFields = [];
  if (first_name === undefined) missingFields.push('first_name');
  if (last_name === undefined) missingFields.push('last_name');
  if (phone === undefined) missingFields.push('phone');
  if (email === undefined) missingFields.push('email');
  if (gender === undefined) missingFields.push('gender');
  if (description === undefined) missingFields.push('description');
  if (position === undefined) missingFields.push('position');
  if (user_role_id === undefined) missingFields.push('user_role_id');
  if (user_id === undefined) missingFields.push('user_id');

  if (missingFields.length > 0) {
    console.log('Missing or undefined fields:', missingFields.join(', ')); // Логирование отсутствующих полей
    return res.status(400).json({ message: 'Missing required fields', missingFields });
  }

  console.log(
    'SQL Query:',
    'UPDATE users SET first_name = ?, last_name = ?, phone = ?, email = ?, user_role_id = ?, gender = ?, description = ?, position = ? WHERE id = ?',
    [first_name, last_name, phone, email, user_role_id, gender, description, position, id],
  );

  try {
    // Обновление записи в таблице users
    const [userResult] = await db.execute(
      'UPDATE users SET first_name = ?, last_name = ?, phone = ?, email = ?, user_role_id = ?, gender = ?, description = ?, position = ? WHERE id = ?',
      [first_name, last_name, phone, email, user_role_id, gender, description, position, id],
    );

    // Обновление записи в таблице employees
    const [employeeResult] = await db.execute(
      'UPDATE employees SET first_name = ?, last_name = ?, phone = ?, email = ?, user_id = ?, gender = ?, description = ?, position = ? WHERE user_id = ?',
      [first_name, last_name, phone, email, user_id, gender, description, position, id],
    );

    if (userResult.affectedRows === 0 && employeeResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
