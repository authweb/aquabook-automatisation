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

router.post('/services', async (req, res) => {
    let { category_id, name, description, price_from, price_to, tags, duration } = req.body;

    if (!category_id || !Number.isInteger(Number(category_id))) {
        return res.status(400).send("Invalid category_id");
    }

    category_id = category_id || 0;
    name = name || '';
    description = description || '';
    price_from = price_from || 0;
    price_to = price_to || 0;
    tags = tags || '';
    duration = duration || 0;

    try {
        const [result] = await db.execute(
            'INSERT INTO services (category_id, name, description, price_from, price_to, tags, duration) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [category_id, name, description, price_from, price_to, tags, duration],
        );
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Failed to add service' });
        }
        res.json({
            message: 'Service added successfully',
            service: {
                id: result.insertId,
                category_id,
                name,
                description,
                price_from,
                price_to,
                tags,
                duration,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
