const express = require('express');
const router = express.Router();
const db = require('../src/config/dbConnect');

// Получение всех отделов
router.get('/departments', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM departments');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No departments found' });
    }

    res.json({
      message: 'Departments fetched successfully',
      departments: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Получение отдела по id
router.get('/departments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM departments WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({
      message: 'Department fetched successfully',
      department: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Создание нового отдела
router.post('/departments', async (req, res) => {
  const { name, description } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO departments (name, description) VALUES (?, ?)',
      [name, description]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Failed to add department' });
    }

    res.json({
      message: 'Department added successfully',
      department: {
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

// Обновление отдела
router.put('/departments/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE departments SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({
      message: 'Department updated successfully',
      department: {
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

// Удаление отдела
router.delete('/departments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM departments WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
