module.exports = {
  apps: [
    {
      name: "main-app",
      script: "./index.js",  // путь к вашему основному приложению
      watch: true,
      env: {
        NODE_ENV: "production",
        PORT: 3000  // Порт для основного приложения
      }
    },
    {
      name: "api-server",
      script: "nodemon",
      args: "api/index.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        API_PORT: 4000  // Порт для API
      }
    }
  ]
};
