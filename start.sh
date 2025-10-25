#!/bin/bash

# Railway启动脚本
# 每次部署时自动运行

echo "🚀 Railway启动脚本执行中..."

# 1. 清理所有进程
echo "🧹 清理所有进程..."
pkill -f "next" 2>/dev/null || true
pkill -f "node" 2>/dev/null || true
pkill -f "npm" 2>/dev/null || true

# 2. 等待进程完全停止
echo "⏳ 等待进程停止..."
sleep 3

# 3. 检查环境变量
echo "🔧 检查环境变量..."
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"

# 4. 启动应用
echo "🚀 启动应用..."
if [ "$NODE_ENV" = "production" ]; then
    echo "生产环境启动..."
    npm start
else
    echo "开发环境启动..."
    npm run dev
fi
