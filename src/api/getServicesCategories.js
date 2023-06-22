const express = require('express');
const router = express.Router();
const db = require('../config/dbConnect');

router.get('/service-categories', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM services_categories');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No service categories found' });
    }

    const servicesCategories = rows;
    res.json({
      message: 'Service categories fetched successfully',
      servicesCategories: servicesCategories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
