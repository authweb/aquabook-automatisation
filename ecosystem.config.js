module.exports = {
  apps: [
    {
      name: "main-app",
      script: "./index.js",
      exec_mode: "cluster", // Кластерный режим
      instances: "max", // Использовать все доступные ядра
      watch: false, // Отключить наблюдение за изменениями
      ignore_watch: ["logs"], // Исключить определенные директории (на всякий случай)
      max_memory_restart: "200M", // Перезапуск при превышении 200MB памяти
      restart_delay: 5000, // Задержка 5 секунд перед перезапуском
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      },
      error_file: "./logs/main-app-err.log", // Логи ошибок
      out_file: "./logs/main-app-out.log", // Логи вывода
      merge_logs: true, // Объединение логов
      log_date_format: "YYYY-MM-DD HH:mm Z" // Формат даты в логах
    },
    {
      name: "api-server",
      script: "nodemon",
      args: "api/index.js",
      exec_mode: "fork", // Обычный режим
      instances: 1, // Один экземпляр
      watch: false, // Отключить наблюдение за изменениями
      ignore_watch: ["logs"], // Исключить определенные директории (на всякий случай)
      max_memory_restart: "200M", // Перезапуск при превышении 200MB памяти
      restart_delay: 5000, // Задержка 5 секунд перед перезапуском
      env: {
        NODE_ENV: "development",
        API_PORT: 4000
      },
      env_production: {
        NODE_ENV: "production",
        API_PORT: 4000
      },
      error_file: "./logs/api-server-err.log", // Логи ошибок
      out_file: "./logs/api-server-out.log", // Логи вывода
      merge_logs: true, // Объединение логов
      log_date_format: "YYYY-MM-DD HH:mm Z" // Формат даты в логах
    },
    {
      name: "staging-app",
      script: "yarn",
      args: "dev:start",
      exec_mode: "fork", // Обычный режим
      instances: 1, // Один экземпляр
      watch: false, // Отключить наблюдение за изменениями
      ignore_watch: ["build", "logs"], // Исключить определенные директории (на всякий случай)
      max_memory_restart: "200M", // Перезапуск при превышении 200MB памяти
      restart_delay: 5000, // Задержка 5 секунд перед перезапуском
      wait_ready: true, // Ожидание сигнала готовности от приложения
      listen_timeout: 5000, // Максимальное время ожидания сигнала готовности (5 секунд)
      env: {
        NODE_ENV: "development",
        PORT: 5000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5000
      },
      error_file: "./logs/staging-app-err.log", // Логи ошибок
      out_file: "./logs/staging-app-out.log", // Логи вывода
      merge_logs: true, // Объединение логов
      log_date_format: "YYYY-MM-DD HH:mm Z" // Формат даты в логах
    }
  ]
};
