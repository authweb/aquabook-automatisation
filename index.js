const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();

// Массив разрешенных источников
const allowedOrigins = [
    "https://aqua-book.ru",
    "http://localhost:3001"
];

// Настройка CORS с проверкой разрешенных источников
app.use(cors({
    origin: function (origin, callback) {
        // разрешить запросы без источника (например, мобильные приложения или curl запросы)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'Политика CORS для этого сайта не позволяет доступ с указанного источника.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

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