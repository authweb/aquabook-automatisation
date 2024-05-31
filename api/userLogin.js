const express = require('express');
const router = express.Router();
const bcr = require('bcrypt');
const db = require('../src/config/dbConnect');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверка существования пользователя
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      console.log(`Неудачная попытка входа: пользователь с email ${email} не найден`);
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // Сравнение паролей
    const user = rows[0];
    const match = await bcr.compare(password, user.password);
    if (!match) {
      console.log(`Неудачная попытка входа: неверный пароль для email ${email}`);
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // Создание токена
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log(`Пользователь вошел в систему: ${user.email}`); // Вывод информации о входе пользователя

    // Отправка ответа
    res.json({
      message: 'Вход выполнен успешно',
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        password: user.password,
      },
      token: token,
    });
  } catch (error) {
    console.error('Ошибка сервера:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


module.exports = router;
