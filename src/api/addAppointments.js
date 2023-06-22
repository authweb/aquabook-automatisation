const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect');

router.post('/appointments', async (req, res) => {
  const { start, end, text, resource, phone, email, clientName } = req.body;

  try {
    // Проверяем, существует ли уже клиент
    const [clients] = await db.execute('SELECT * FROM clients WHERE email = ? OR phone = ?', [
      email,
      phone,
    ]);

    let clients_id;

    if (clients.length > 0) {
      // Клиент уже существует
      clients_id = clients[0].id;
    } else {
      // Клиента не существует, добавляем нового клиента
      const [result] = await db.execute(
        'INSERT INTO clients (first_name, phone, email) VALUES (?, ?, ?)',
        [clientName, phone, email],
      );
      clients_id = result.insertId;
    }

    // Добавляем новую запись
    const [appointmentResult] = await db.execute(
      'INSERT INTO appointments (clients_id, start, end, text, resource) VALUES (?, ?, ?, ?, ?)',
      [clients_id, start, end, text, resource],
    );

    if (appointmentResult.affectedRows === 0) {
      return res.status(400).json({ message: 'Failed to create appointment' });
    }

    const appointmentId = appointmentResult.insertId;
    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: { id: appointmentId, clients_id, start, end, text, resource },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
