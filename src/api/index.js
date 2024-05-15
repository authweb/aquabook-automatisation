const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const routes = require('./routes/routes');

const app = express();
dotenv.config();

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.DB_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
