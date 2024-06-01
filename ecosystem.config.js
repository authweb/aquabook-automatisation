module.exports = {
  apps: [
    {
      name: "main-app",
      script: "./index.js",
      watch: true,
      max_memory_restart: '200M',
      restart_delay: 5000,
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    },
    {
      name: "api-server",
      script: "nodemon",
      args: "api/index.js",
      watch: true,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: "development",
        API_PORT: 4000
      }
    },
    {
      name: "staging-app",
      script: "npm",
      args: "run dev:start",
      instances: "max",
      exec_mode: "cluster",
      watch: true,
      max_memory_restart: '200M',
      wait_ready: true,
      listen_timeout: 5000,
      env: {
        NODE_ENV: "development",
        PORT: 3001
      }
    },
  ]
};
