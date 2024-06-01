const express = require('express');
const router = express.Router();
const db = require('../src/config/dbConnect');

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

router.post('/service-categories', async (req, res) => {
    const { name, description } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO services_categories (name, description) VALUES (?, ?)',
            [name, description],
        );
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Failed to add service category' });
        }
        res.json({
            message: 'Service category added successfully',
            serviceCategory: {
                id: result.insertId,
                name,
                description,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Обновить категорию услуг по ID
router.put('/service-categories/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE services_categories SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service category not found' });
        }

        res.json({
            message: 'Service category updated successfully',
            serviceCategory: {
                id,
                name,
                description,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/service-categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM service_categories WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service category not found' });
        }
        res.json({
            message: 'Service category deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
