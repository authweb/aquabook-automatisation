const express = require('express');
const router = express.Router();

// Получение профиля пользователя
router.get('/', (req, res) => {
  const clients = req.clients;
  res.json(clients);
});

module.exports = router;
