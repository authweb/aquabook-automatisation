-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Ноя 21 2023 г., 02:18
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
  `text` varchar(255) NOT NULL,
  `resource` int(11) NOT NULL,
  `clients_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `appointments`
--

INSERT INTO `appointments` (`id`, `start`, `end`, `text`, `resource`, `clients_id`) VALUES
(30, '2023-11-02 11:43:00', '2023-11-02 13:43:00', 'dsfdfs Мойка кузова +7 983 335 07 07 fdsf@mail.ru', 22, 47),
(31, '2023-11-02 12:07:00', '2023-11-02 14:07:00', 'sefe Мойка кузова +7 234 234 23 42 fsdf@mail.ru', 22, 87),
(35, '2023-11-02 14:19:53', '2023-11-02 15:19:55', 'fgdfgdfg Отбойник кузова с пеной +7 435 353 45 34 fgdf@mail.ru', 22, 68),
(36, '2023-11-02 16:00:00', '2023-11-02 17:00:59', 'dfsdfdf Отбойник кузова с пеной +7 324 234 23 44 fds@mail.ru', 22, 92),
(37, '2023-11-02 12:00:00', '2023-11-02 12:59:59', 'dsfdsf Двухфазная мойка кузова +7 324 234 23 44 dfds@mail.ru', 23, 77),
(38, '2023-11-02 12:00:00', '2023-11-02 12:59:59', '   ', 23, 88),
(39, '2023-11-02 12:00:00', '2023-11-02 12:30:00', '   ', 23, 88);

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
(11, 'Валерий', 'Гололобов', '+7 933 301 41 56', 'gooldg@mail.ru'),
(13, 'Евгений', 'Сергеев', '+7 999 333 44 55', 'evsergeev@mail.ru'),
(17, 'Юрий', '', '+7 923 355-20-02', 'yura45@gmail.com'),
(18, 'Валерий', 'Гололобов', '+79333014156', 'gooldg@mail.ru'),
(19, 'Валерий', 'Гололобов', '+79333014156', 'gooldg@mail.ru'),
(29, 'Юлия', '', '+7 902 913-67-30', 'ypi124@gmail.com'),
(30, 'Егор', '', '+7 902 971-43-27', 'yosannn@mail.ru'),
(31, 'Илья', '', '+7 913 499-53-10', 'xileika@mail.ru'),
(32, 'Евгения', '', '+7 923 302-46-89', 'xena75@mail.ru'),
(33, 'Евгения', '', '+7 905 971-68-67', 'xena75@mail.ru'),
(34, 'Игорь', '', '+7 950 438-57-89', 'voroninigor99@mail.ru'),
(35, 'Владислав', '', '+7 923 136-39-09', 'vladsmoker@yadnex.ru'),
(36, 'Вадим', '', '+7 933 301-20-44', 'vadim.al.124@gmail.com'),
(37, 'Вадим', '', '+7 983 157-04-32', 'vadiko7@mail.ru'),
(38, 'Иван', '', '+7 999 446-05-35', 'tuzkov-i@bk.ru'),
(39, 'John', 'Doe', '1234567890', 'john.doe@example.com'),
(40, 'Олег', '', '+7 923 644 54 48', 'oleg228@gengsta.ru'),
(41, 'Valery', '', '+79333014156', 'gooldg@mail.ru'),
(42, 'Сергей', '', '+79833350707', 'grigoriev@mail.ru'),
(43, 'Valery', '', '+7 933 301 41 56', 'gooldg@mail.ru'),
(44, 'Valery', '', '+7 933 301 41 56', 'gooldg@mail.ru'),
(45, 'Valery', '', '+7 933 301 41 56', 'gooldg@mail.ru'),
(46, 'Client', '', '+7 444 444 33 55', 'client@mail.ru'),
(47, 'Valery', '', '+7 983 335 07 07', 'gooldg9@mail.com'),
(48, 'Valery', '', '+7 983 335 07 07', 'gooldg9@mail.com'),
(49, 'Valery', '', '+7 933 301 41 56', 'gooldg@gmail.com'),
(50, 'Valery', '', '+7 922 234 25 22', 'gooldg9@mail.com'),
(51, 'Valery', '', '+7 999 333 44 55', 'gooldg9@mail.ru'),
(52, 'sdfdf', '', '+7 923 355 33 89', 'sdfsd@mail.ru'),
(53, 'fdfsfdsf', '', '+7 923 355 33 89', 'sdfsd@mail.ru'),
(54, 'sdfsdfsdf', '', '+7 923 355 33 89', 'sdfsd@mail.ru'),
(55, 'dsfshdfhsd', '', '+7 923 355 33 89', 'sdfsd@mail.ru'),
(56, 'ываывапы', '', '+7 933 301 41 56', 'dsfdsf@mail.ru'),
(57, 'dfsdfsd', '', '+7 234 236 72 34', 'sdfhsdfg@mail.ru'),
(58, 'ываываыва', '', '+7 324 236 23 42', 'sdfsdf@mail.ru'),
(59, 'выаыва', '', '+7 323 426 24 34', 'fdfgfdsg@mail.ru'),
(60, 'аываыв', '', '+7 793 330 14 15', 'dsfgdsfg@mail.ru'),
(61, 'Valery', '', '+7 933 301 41 56', 'gooldg@mail.ru'),
(62, 'Gleb', '', '+7 923 332 59 55', 'gleb24@mail.ru'),
(63, 'gleb', '', '+7 924 294 24 24', 'gleb24@mail.ru'),
(64, 'gleb', '', '+7 932 252 35 26', 'gleb24@mail.ru'),
(65, 'fdhgfd', '', '+7 999 333 44 55', 'gfdjdfgj@mail.ru'),
(66, 'вафывп', '', '+7 999 333 44 55', 'gfdjdfgj@mail.ru'),
(67, 'Валерий', '', '+7 933 333 33 45', 'gooldg@mail.ru'),
(68, 'dfgefg', '', '+7 345 345 34 53', 'fgdf@mail.ru'),
(69, 'выаыва', '', '+7 342 342 34 24', 'dsfsd@mail.ru'),
(70, 'dsfsd', '', '+7 915 110 69 99', 'fdsf@mail.ru'),
(71, 'adsfsf', '', '+7 915 110 69 99', 'fdsf@mail.ru'),
(72, 'выаыв', '', '+7 983 335 07 07', 'dfs@mail.ru'),
(73, 'dfsdf', '', '+7 915 110 69 99', 'gfsddg@mail.ru'),
(74, 'dfsd', '', '+7 983 335 07 07', 'sdsf@mail.ru'),
(75, 'sdfsd', '', '+7 999 333 44 55', 'fdd@mail.ru'),
(76, 'asdasd', '', '+7 343 534 53 45', 'sd@mail.ru'),
(77, 'dsfsd', '', '+7 342 342 34 23', 'dfds@mail.ru'),
(78, 'dsfsdf', '', '+7 933 301 41 56', 'dfdsf@mail.ru'),
(79, 'выаыва', '', '+7 999 333 44 55', 'dsfs@mail.ru'),
(80, 'dsfsdf', '', '+7 999 333 44 55', 'dfgds@mail.ru'),
(81, 'dsfsdf', '', '+7 453 453 45 34', 'sdfsd@mail.ru'),
(82, 'выаыва', '', '+7 343 534 53 45', 'sdf@mail.ru'),
(83, 'fsfsdfsd', '', '+7 343 534 53 45', 'sdf@mail.ru'),
(84, 'dsfsdf', '', '+7 343 534 53 45', 'sdf@mail.ru'),
(85, 'dsfsdf', '', '+7 343 534 53 45', 'sdf@mail.ru'),
(86, 'dsfdfs', '', '+7 983 335 07 07', 'fdsf@mail.ru'),
(87, 'sefe', '', '+7 234 234 23 42', 'fsdf@mail.ru'),
(88, '', '', '', ''),
(89, '', '', '', ''),
(90, '', '', '', ''),
(91, 'fgdfgdfg', '', '+7 435 353 45 34', 'fgdf@mail.ru'),
(92, 'dfsdfdf', '', '+7 324 234 23 44', 'fds@mail.ru'),
(93, 'dsfdsf', '', '+7 324 234 23 44', 'dfds@mail.ru'),
(94, '', '', '', ''),
(95, '', '', '', '');

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
  ADD KEY `clients_id` (`clients_id`) USING BTREE,
  ADD KEY `resource` (`resource`) USING BTREE;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

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
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`clients_id`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`resource`) REFERENCES `employees` (`id`);

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
