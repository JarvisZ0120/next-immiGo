#!/bin/bash

# Railway专用部署脚本
# 在Railway环境中使用，确保进程清理和正确启动

echo "🚀 Railway部署脚本启动..."

# 1. 停止所有进程（Railway环境）
echo "📋 停止所有相关进程..."
pkill -f "next" 2>/dev/null || true
pkill -f "node" 2>/dev/null || true
pkill -f "npm" 2>/dev/null || true

# 2. 等待进程停止
echo "⏳ 等待进程停止..."
sleep 3

# 3. 检查环境变量
echo "🔧 检查环境变量..."
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "GMAIL_USER: ${GMAIL_USER:+已设置}"
echo "GMAIL_PASS: ${GMAIL_PASS:+已设置}"
echo "MONGODB_URI: ${MONGODB_URI:+已设置}"

# 4. 安装依赖
echo "📦 安装依赖..."
npm install --production

# 5. 构建应用
echo "🔨 构建应用..."
npm run build

# 6. 启动应用
echo "🚀 启动应用..."
if [ "$NODE_ENV" = "production" ]; then
    echo "生产环境启动..."
    npm start
else
    echo "开发环境启动..."
    npm run dev
fi
