const express = require('express');
const router = express.Router();

// Получение профиля пользователя
router.get('/', (req, res) => {
  const users = req.users;
  res.json(users);
});

module.exports = router;
