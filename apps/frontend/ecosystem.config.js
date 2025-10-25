module.exports = {
  apps: [
    {
      name: 'frontend',
      cwd: __dirname,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3010',
      env: {
        NODE_ENV: 'production',
        PORT: '3010',
      },
      max_restarts: 10,
      restart_delay: 5000,
      autorestart: true,
      time: true,
    },
  ],
};
