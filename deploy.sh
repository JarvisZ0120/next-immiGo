#!/bin/bash

# Railway部署脚本
# 确保在部署前清理所有进程，然后重新启动

echo "🚀 开始Railway部署流程..."

# 1. 停止所有相关进程
echo "📋 步骤1: 停止所有相关进程"
echo "正在停止Next.js进程..."
pkill -f "next dev" 2>/dev/null || echo "没有找到Next.js进程"

echo "正在停止Node.js服务器进程..."
pkill -f "node server.js" 2>/dev/null || echo "没有找到server.js进程"

echo "正在停止Next.js服务器进程..."
pkill -f "next-server" 2>/dev/null || echo "没有找到next-server进程"

echo "正在停止PM2进程..."
pkill -f "pm2" 2>/dev/null || echo "没有找到PM2进程"

# 2. 等待进程完全停止
echo "⏳ 步骤2: 等待进程完全停止..."
sleep 5

# 3. 检查端口是否释放
echo "🔍 步骤3: 检查端口状态..."
echo "检查端口3000, 3001, 3002..."
netstat -an | grep LISTEN | grep -E "300[0-2]" || echo "所有端口已释放"

# 4. 清理可能的缓存
echo "🧹 步骤4: 清理缓存..."
rm -f server.log 2>/dev/null || echo "没有找到server.log"
rm -f .next/cache/* 2>/dev/null || echo "没有找到.next/cache"

# 5. 检查环境变量
echo "🔧 步骤5: 检查环境变量..."
if [ -f .env ]; then
    echo "✅ .env文件存在"
    echo "Gmail配置: $(grep GMAIL_USER .env | cut -d'=' -f2)"
    echo "MongoDB配置: $(grep MONGODB_URI .env | cut -d'=' -f2 | cut -c1-20)..."
else
    echo "❌ .env文件不存在"
    exit 1
fi

# 6. 安装依赖（如果需要）
echo "📦 步骤6: 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "安装依赖..."
    npm install
else
    echo "✅ 依赖已安装"
fi

# 7. 启动应用
echo "🚀 步骤7: 启动应用..."
echo "启动Next.js开发服务器..."

# 在后台启动Next.js
npm run dev > server.log 2>&1 &

# 等待服务器启动
echo "等待服务器启动..."
sleep 10

# 8. 验证启动状态
echo "✅ 步骤8: 验证启动状态..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Next.js服务器启动成功 (端口3000)"
else
    echo "❌ Next.js服务器启动失败"
    echo "检查日志:"
    tail -20 server.log
    exit 1
fi

# 9. 测试关键API
echo "🧪 步骤9: 测试关键API..."

# 测试sendEmail API
echo "测试sendEmail API..."
EMAIL_TEST=$(curl -s -X POST http://localhost:3000/api/sendEmail \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","subject":"部署测试","message":"<h1>部署测试</h1>"}' \
    --max-time 10)

if echo "$EMAIL_TEST" | grep -q "success"; then
    echo "✅ sendEmail API测试成功"
else
    echo "❌ sendEmail API测试失败"
    echo "响应: $EMAIL_TEST"
fi

# 10. 部署完成
echo ""
echo "🎉 部署完成！"
echo "📊 服务状态:"
echo "   - Next.js: http://localhost:3000"
echo "   - 日志文件: server.log"
echo ""
echo "📋 常用命令:"
echo "   - 查看日志: tail -f server.log"
echo "   - 停止服务: pkill -f 'next dev'"
echo "   - 重启服务: ./deploy.sh"
echo ""
echo "🔗 Railway部署:"
echo "   1. 提交代码: git add . && git commit -m 'deploy'"
echo "   2. 推送到Railway: git push"
echo "   3. 检查Railway日志确保部署成功"
