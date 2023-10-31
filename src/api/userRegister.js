const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/dbConnect');

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into database
    const [userResult] = await db.execute(
      'INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone, hashedPassword],
    );
    console.log(userResult); // Выводим данные пользователя в консоль
    const userId = userResult.insertId;

    await db.execute(
      'INSERT INTO employees (id, first_name, last_name, phone, email ) VALUES (?, ?, ?, ?, ?)',
      [userId, first_name, last_name, phone, email],
    );

    const roleId = 1;
    await db.execute('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, roleId]);

    // await db.execute(
    //   'INSERT INTO clients (id, first_name, last_name, phone, email ) VALUES (?, ?, ?, ?, ?)',
    //   [userId, first_name, last_name, phone, email],
    // );

    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
