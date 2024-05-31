-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Дек 16 2023 г., 13:51
-- Версия сервера: 5.7.24
-- Версия PHP: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `carwash_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `selectedServices` text,
  `serviceEmployeeMap` text,
  `text` text,
  `clients_id` int(11) DEFAULT NULL,
  `totalCost` decimal(10,2) DEFAULT NULL,
  `is_paid` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `appointments`
--

INSERT INTO `appointments` (`id`, `start`, `end`, `selectedServices`, `serviceEmployeeMap`, `text`, `clients_id`, `totalCost`, `is_paid`) VALUES
(1, '2023-12-16 11:15:00', '2023-12-16 11:45:00', 'Мойка кузова', 'Валерий', 'Евгений Сергеев +7 999 333 44 55, Мойка кузова', 13, '450.00', 1),
(2, '2023-12-16 12:00:00', '2023-12-16 12:30:00', 'Мойка кузова', 'Евгений', 'Валерий Гололобов +79333014156, Мойка кузова', 18, '450.00', 0),
(3, '2023-12-16 12:15:00', '2023-12-16 12:45:00', 'Мойка кузова', 'Валерий', 'Юрий  +7 923 355-20-02, Мойка кузова', 17, '450.00', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `car_info`
--

CREATE TABLE `car_info` (
  `id` int(11) NOT NULL,
  `clients_id` int(11) NOT NULL,
  `car_number` varchar(20) NOT NULL,
  `car_make` varchar(50) NOT NULL,
  `car_model` varchar(50) NOT NULL,
  `car_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `car_info`
--

INSERT INTO `car_info` (`id`, `clients_id`, `car_number`, `car_make`, `car_model`, `car_type`) VALUES
(11, 11, 'е216нн', 'Opel', 'Astra', 'седан'),
(12, 13, 'е216нн', 'Opel', 'Astra', 'седан');

-- --------------------------------------------------------

--
-- Структура таблицы `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `clients`
--

INSERT INTO `clients` (`id`, `first_name`, `last_name`, `phone`, `email`) VALUES
(11, 'Александр', 'Иванов', '+7 912 345 67 89', 'ivanov@mail.ru'),
(13, 'Мария', 'Петрова', '+7 923 456 78 90', 'mpetrova@mail.ru'),
(17, 'Николай', 'Сидоров', '+7 934 567 89 01', 'sidorovn@mail.ru'),
(18, 'Ольга', 'Кузнецова', '+7 945 678 90 12', 'kuznetsova@mail.ru'),
(19, 'Дмитрий', 'Смирнов', '+7 956 789 01 23', 'dsmirnov@mail.ru'),
(29, 'Елена', 'Морозова', '+7 967 890 12 34', 'morozova@mail.ru'),
(30, 'Игорь', 'Волков', '+7 978 901 23 45', 'volkov@mail.ru'),
(31, 'Татьяна', 'Соловьева', '+7 989 012 34 56', 'tsolovieva@mail.ru'),
(32, 'Василий', 'Васильев', '+7 990 123 45 67', 'vvasiliev@mail.ru'),
(33, 'Светлана', 'Павлова', '+7 901 234 56 78', 'pavlova@mail.ru'),
(34, 'Анна', 'Семенова', '+7 912 345 67 89', 'asemenova@mail.ru'),
(35, 'Михаил', 'Голубев', '+7 923 456 78 90', 'mgolubev@mail.ru'),
(36, 'Ирина', 'Орлова', '+7 934 567 89 01', 'orlova@mail.ru'),
(37, 'Андрей', 'Андреев', '+7 945 678 90 12', 'andreev@mail.ru'),
(38, 'Ксения', 'Федорова', '+7 956 789 01 23', 'fedorova@mail.ru'),
(39, 'Петр', 'Алексеев', '+7 967 890 12 34', 'palekseev@mail.ru'),
(40, 'Олег', 'Дмитриев', '+7 978 901 23 45', 'odmitriev@mail.ru'),
(41, 'Алла', 'Петровна', '+7 989 012 34 56', 'apetrovna@mail.ru'),
(42, 'Георгий', 'Николаев', '+7 990 123 45 67', 'gnikolaev@mail.ru'),
(43, 'Людмила', 'Ивановна', '+7 901 234 56 78', 'livanovna@mail.ru'),
(44, 'Виктор', 'Сергеев', '+7 912 345 67 89', 'vsergeev@mail.ru'),
(45, 'Наталья', 'Викторовна', '+7 923 456 78 90', 'nviktorovna@mail.ru'),
(46, 'Денис', 'Олегович', '+7 934 567 89 01', 'dolegovich@mail.ru'),
(47, 'Екатерина', 'Максимова', '+7 945 678 90 12', 'emaximova@mail.ru'),
(48, 'Григорий', 'Леонидович', '+7 956 789 01 23', 'gleonidovich@mail.ru'),
(49, 'Леонид', 'Михайлович', '+7 967 890 12 34', 'lmikhailovich@mail.ru'),
(50, 'Максим', 'Григорьев', '+7 978 901 23 45', 'mgrigoriev@mail.ru'),
(51, 'Виктория', 'Игоревна', '+7 989 012 34 56', 'vigorevna@mail.ru'),
(52, 'Вадим', 'Александрович', '+7 990 123 45 67', 'valeksandrovich@mail.ru'),
(53, 'Антон', 'Васильевич', '+7 901 234 56 78', 'avasilevich@mail.ru'),
(54, 'Тамара', 'Николаевна', '+7 912 345 67 89', 'tnikolaevna@mail.ru'),
(55, 'Лариса', 'Ивановна', '+7 923 456 78 90', 'livanovna@mail.ru'),
(56, 'Сергей', 'Петрович', '+7 934 567 89 01', 'spetrovich@mail.ru'),
(57, 'Вера', 'Алексеевна', '+7 945 678 90 12', 'valekseevna@mail.ru'),
(58, 'Анатолий', 'Борисович', '+7 956 789 01 23', 'aborisovich@mail.ru'),
(59, 'Роман', 'Владимирович', '+7 967 890 12 34', 'rvladimirovich@mail.ru'),
(60, 'Оксана', 'Юрьевна', '+7 978 901 23 45', 'oyurievna@mail.ru'),
(61, 'Валерия', 'Михайловна', '+7 989 012 34 56', 'vmikhailovna@mail.ru'),
(62, 'Галина', 'Петровна', '+7 990 123 45 67', 'gpetrovna@mail.ru'),
(63, 'Артем', 'Сергеевич', '+7 901 234 56 78', 'asergeevich@mail.ru'),
(64, 'Юлия', 'Викторовна', '+7 912 345 67 89', 'yvictorovna@mail.ru'),
(65, 'Константин', 'Игоревич', '+7 923 456 78 90', 'kigorevich@mail.ru'),
(66, 'Евгения', 'Олеговна', '+7 934 567 89 01', 'eolegovna@mail.ru'),
(67, 'Станислав', 'Геннадьевич', '+7 945 678 90 12', 'sgennadievich@mail.ru'),
(68, 'Василиса', 'Егоровна', '+7 956 789 01 23', 'vegorovna@mail.ru'),
(69, 'Степан', 'Артемович', '+7 967 890 12 34', 'sartemovich@mail.ru'),
(70, 'Лидия', 'Степановна', '+7 978 901 23 45', 'lstepanovna@mail.ru'),
(71, 'Инна', 'Владимировна', '+7 989 012 34 56', 'ivladimirovna@mail.ru'),
(72, 'Надежда', 'Максимовна', '+7 990 123 45 67', 'nmaximovna@mail.ru'),
(73, 'Аркадий', 'Николаевич', '+7 901 234 56 78', 'anikolaevich@mail.ru'),
(74, 'Марина', 'Александровна', '+7 912 345 67 89', 'maleksandrovna@mail.ru'),
(75, 'Даниил', 'Матвеевич', '+7 923 456 78 90', 'dmatveevich@mail.ru'),
(76, 'Иванна', 'Дмитриевна', '+7 934 567 89 01', 'idmitrievna@mail.ru'),
(77, 'Федор', 'Игнатьевич', '+7 945 678 90 12', 'fignatievich@mail.ru'),
(78, 'Борис', 'Владимирович', '+7 956 789 01 23', 'bvladimirovich@mail.ru'),
(79, 'Вероника', 'Сергеевна', '+7 967 890 12 34', 'vsergeevna@mail.ru'),
(80, 'Кирилл', 'Васильевич', '+7 978 901 23 45', 'kvasilevich@mail.ru'),
(81, 'Алёна', 'Алексеевна', '+7 989 012 34 56', 'aalekseevna@mail.ru'),
(82, 'Егор', 'Андреевич', '+7 990 123 45 67', 'eandreevich@mail.ru'),
(83, 'Зоя', 'Артемовна', '+7 901 234 56 78', 'zartemovna@mail.ru'),
(84, 'Виталий', 'Геннадьевич', '+7 912 345 67 89', 'vgennadievich@mail.ru'),
(85, 'Ксения', 'Степановна', '+7 923 456 78 90', 'kstepanovna@mail.ru'),
(86, 'Владимир', 'Игоревич', '+7 934 567 89 01', 'vigorevich@mail.ru'),
(87, 'Тамара', 'Николаевна', '+7 945 678 90 12', 'tnikolaevna@mail.ru'),
(88, 'София', 'Максимовна', '+7 956 789 01 23', 'smaximovna@mail.ru'),
(89, 'Евгений', 'Александрович', '+7 967 890 12 34', 'ealeksandrovich@mail.ru'),
(90, 'Валентина', 'Дмитриевна', '+7 978 901 23 45', 'vdmitrievna@mail.ru'),
(91, 'Леонид', 'Федорович', '+7 989 012 34 56', 'lfedorovich@mail.ru'),
(92, 'Маргарита', 'Петровна', '+7 990 123 45 67', 'mpetrovna@mail.ru'),
(93, 'Арина', 'Сергеевна', '+7 901 234 56 78', 'asergeevna@mail.ru'),
(94, 'Григорий', 'Андреевич', '+7 912 345 67 89', 'gandreevich@mail.ru'),
(95, 'Екатерина', 'Васильевна', '+7 923 456 78 90', 'ekvasilievna@mail.ru');

-- --------------------------------------------------------

--
-- Структура таблицы `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access` enum('employee','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'employee',
  `user_id` int(11) DEFAULT NULL,
  `gender` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `position` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `employees`
--

INSERT INTO `employees` (`id`, `first_name`, `last_name`, `email`, `phone`, `access`, `user_id`, `gender`, `description`, `position`) VALUES
(22, 'Валерий', 'Гололобов', 'gooldg@mail.ru', '+79333014156', 'employee', 22, '', NULL, 'Автомойщик'),
(23, 'Евгений', 'Сергеев', 'evgserg@mail.ru', '+79993334455', 'employee', 23, NULL, NULL, 'Автомойщик');

--
-- Триггеры `employees`
--
DELIMITER $$
CREATE TRIGGER `SetUserIdBeforeInsert` BEFORE INSERT ON `employees` FOR EACH ROW BEGIN
   SET NEW.user_id = (SELECT id FROM users WHERE email = NEW.email);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `clients_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `order_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `orders_history`
--

CREATE TABLE `orders_history` (
  `id` int(11) NOT NULL,
  `clients_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Сотрудник'),
(2, 'Администратор'),
(3, 'Владелец');

-- --------------------------------------------------------

--
-- Структура таблицы `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `day` varchar(20) NOT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price_from` decimal(10,2) NOT NULL,
  `price_to` decimal(10,2) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `services`
--

INSERT INTO `services` (`id`, `category_id`, `name`, `description`, `price_from`, `price_to`, `tags`, `duration`) VALUES
(65, 2, 'Отбойник кузова', '− Бесконтактная мойка кузова аппаратом высокого давления\r\n(кузов, колеса, колесные арки, пороги)\r\n− Без протирки', '250.00', '400.00', 'Включено', 15),
(66, 2, 'Отбойник кузова с пеной', '− Бесконтактная мойка кузова аппаратом высокого давления с шампунем (кузов,\r\nколеса, колесные арки, пороги)\r\n− Без протирки', '350.00', '600.00', 'Включено', 20),
(67, 2, 'Мойка кузова', '− Бесконтактная мойка кузова аппаратом высокого давления с шампунем (кузов,\r\nколеса со щеткой, колесные арки, пороги)\r\n− Протирка порогов и стекол снаружи\r\n− Чистка резиновых уплотнителей дверей\r\n− Сушка и продувка кузова', '450.00', '800.00', 'Включено', 30),
(68, 2, 'Двухфазная мойка кузова', '− Предварительная бесконтактная мойка кузова аппаратом высокого давления с\r\nшампунем (кузов, колеса со щеткой , колесные арки, пороги)\r\n− Ручная мойка кузова нейтральным шампунем с крупноячеистой губкой\r\n− Протирка порогов и стекол снаружи\r\n− Сушка кузова', '650.00', '900.00', 'Включено', 40),
(69, 2, 'Трехфазная мойка кузова', '− Предварительная бесконтактная мойка кузова аппаратом высокого давления с\r\nшампунем (кузов, колеса со щеткой , колесные арки, пороги)\r\n− Ручная мойка кузова нейтральным шампунем с крупноячеистой губкой\r\n− Протирка порогов и стекол снаружи\r\n− Обработка кузова нано воском (придает ЛКП яркий блеск и гидрофобный\r\nэффект этим предохраняет кузов от вредного воздействия дорожных реагентов- грязи, сохраняется до 3-х моек)\r\n− Сушка кузова', '800.00', '1050.00', 'Включено', 50),
(70, 3, 'Уборка салона полностью', '- Пылесос салона (пол, сидения, верхняя полка багажника)\r\n- Влажная уборка салона с применением очистителя Quick Detailer\r\n- Уборка дверных карманов, ниш, бардачков\r\n- Мойка резиновых ковриков, пылесос текстильных\r\n- Мойка педалей\r\n- Очистка труднодоступных мест с помощью кисти\r\n- Очистка стекол стеклоочистителем\r\n', '450.00', '800.00', 'Выключено', 40),
(71, 3, 'Уборка 1/2 салона', '-Пылесос 1/2 салона\r\n- Влажная уборка салона с применением очистителя Quick Detailer\r\n- Уборка дверных карманов, ниш, бардачков\r\n- Мойка резиновых ковриков, пылесос текстильных\r\n- Мойка педалей\r\n- Очистка труднодоступных мест с помощью кисти\r\n- Очистка стекол стеклоочистителем\r\n*При наличии сильных загрязнений стоимость услуги может увеличиваться\r\n', '300.00', '400.00', 'Включено', 30),
(72, 3, 'Влажная уборка салона', 'Протирка пластиковых элементов с применением очистителя Quick Detailer', '300.00', '350.00', 'Включено', 20);

-- --------------------------------------------------------

--
-- Структура таблицы `services_categories`
--

CREATE TABLE `services_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `services_categories`
--

INSERT INTO `services_categories` (`id`, `name`, `description`) VALUES
(1, 'Популярные услуги', NULL),
(2, 'Основные услуги', NULL),
(3, 'Основные услуги(салон)', NULL),
(4, 'Дополнительные услуги', NULL),
(5, 'Детейлинг', NULL),
(6, 'Химчистка', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_role_id` int(11) DEFAULT '1',
  `gender` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `position` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone`, `email`, `password`, `user_role_id`, `gender`, `description`, `position`) VALUES
(22, 'Валерий', 'Гололобов', '+79333014156', 'gooldg@mail.ru', '$2b$10$DGN3DXZ7.dSv2sA1fAN.f.IP5EL90HACebH/owJT1MAaCQARs6Rvm', 1, '', NULL, ''),
(23, 'Евгений', 'Сергеев', '+79993334455', 'evgserg@mail.ru', '$2b$10$WNQbaotq80Bc47xQDeWAn.ioTMG1XXjoXQnVR5RNF12yh2ZZr5qnW', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_roles`
--

INSERT INTO `user_roles` (`id`, `user_id`, `role_id`) VALUES
(2, 22, 1),
(3, 23, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clients_id` (`clients_id`);

--
-- Индексы таблицы `car_info`
--
ALTER TABLE `car_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clients_id` (`clients_id`);

--
-- Индексы таблицы `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clients_id` (`clients_id`);

--
-- Индексы таблицы `orders_history`
--
ALTER TABLE `orders_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clients_id` (`clients_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `services_category_id_fk` (`category_id`);

--
-- Индексы таблицы `services_categories`
--
ALTER TABLE `services_categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_role_id` (`user_role_id`);

--
-- Индексы таблицы `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `car_info`
--
ALTER TABLE `car_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT для таблицы `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `orders_history`
--
ALTER TABLE `orders_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT для таблицы `services_categories`
--
ALTER TABLE `services_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`clients_id`) REFERENCES `clients` (`id`);

--
-- Ограничения внешнего ключа таблицы `car_info`
--
ALTER TABLE `car_info`
  ADD CONSTRAINT `car_info_ibfk_1` FOREIGN KEY (`clients_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`clients_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders_history`
--
ALTER TABLE `orders_history`
  ADD CONSTRAINT `orders_history_ibfk_1` FOREIGN KEY (`clients_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_history_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `services_categories` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_role_id`) REFERENCES `roles` (`id`);

--
-- Ограничения внешнего ключа таблицы `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
