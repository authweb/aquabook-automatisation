const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const routes = require("./routes/routes");

const app = express();
dotenv.config();

// Массив разрешенных источников
const allowedOrigins = [
	"https://aqua-book.ru",
	"http://localhost:5000"
];

// Настройка CORS с проверкой разрешенных источников
app.use(cors({
	origin: function (origin, callback) {
		// Разрешить запросы без источника (например, мобильные приложения или curl запросы)
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			const msg = 'Политика CORS для этого сайта не позволяет доступ с указанного источника.';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	},
	credentials: true
}));

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
