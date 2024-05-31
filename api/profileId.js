const express = require('express');
const router = express.Router();
const db = require('../src/config/dbConnect');

router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const users = rows[0];
    res.json({
      message: 'users fetched successfully',
      users: {
        id: users.id,
        first_name: users.first_name,
        last_name: users.last_name,
        email: users.email,
        phone: users.phone,
        gender: users.gender,
        description: users.description,
        position: users.position,
        is_bookable: users.is_bookable,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
