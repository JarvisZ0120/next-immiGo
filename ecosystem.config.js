module.exports = {
  apps: [
    {
      name: 'next-immigo',
      script: 'npm',
      args: 'run dev',
      cwd: '/Users/zhangjiawei/Desktop/next-immigo',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'server-immigo',
      script: 'server.js',
      cwd: '/Users/zhangjiawei/Desktop/next-immigo',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
};
