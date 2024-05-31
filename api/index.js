const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const routes = require("./routes/routes");

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

// Базовый маршрут для проверки работы API
app.get("/api", (req, res) => {
	res.json({ message: "Hello from API!" });
});

// Регистрация маршрутов
app.use("/api", routes);

// Обработка ошибок
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

// Запуск сервера
const PORT = process.env.API_PORT || 4000; // Добавляем значение по умолчанию
app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`);
});
