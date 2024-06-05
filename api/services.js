const express = require('express');
const router = express.Router();
const db = require('../src/config/dbConnect');

router.get('/services', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM services');
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No services found' });
        }

        const services = rows.reduce((acc, service) => {
            if (!acc[service.category_id]) {
                acc[service.category_id] = [];
            }
            acc[service.category_id].push(service);
            return acc;
        }, {});

        res.json({
            message: 'Services fetched successfully',
            services,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/services/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.execute('SELECT * FROM services WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const service = rows[0];
        res.json({
            message: 'Service fetched successfully',
            service: {
                id: service.id,
                name: service.name,
                description: service.description,
                price_from: service.price_from,
                price_to: service.price_to,
                tags: service.tags,
                duration: service.duration,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/services/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute('DELETE FROM services WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Добавление новой услуги
router.post('/services', async (req, res) => {
    const {
        category_id,
        name,
        description,
        price_from,
        price_to,
        tags,
        duration,
        is_top
    } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO services (category_id, name, description, price_from, price_to, tags, duration, is_top) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [category_id, name, description, price_from, price_to, tags, duration, is_top]
        );

        if (is_top) {
            const popularCategoryId = 1; // ID категории "популярные услуги"
            await db.execute(
                'INSERT INTO services (category_id, name, description, price_from, price_to, tags, duration, is_top) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [popularCategoryId, name, description, price_from, price_to, tags, duration, is_top]
            );
        }

        res.status(201).json({ message: 'Service added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
