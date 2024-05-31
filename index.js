const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();

// Использование CORS для всех маршрутов до их определения
app.use(
    cors({
        origin: "https://aqua-book.ru",
    }),
);

// Использование парсера JSON для всех маршрутов до их определения
app.use(express.json());

// Обслуживание статических файлов из папки build
app.use(express.static(path.join(__dirname, 'build')));

// Регистрация API маршрутов
app.use('/api', require('./api/routes/routes'));

// Обработка всех остальных маршрутов и возвращение index.html
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'build', 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Запуск сервера
const PORT = process.env.PORT || 3000; // Порт для основного приложения
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});