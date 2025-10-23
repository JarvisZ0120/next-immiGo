// 测试统一的邮件服务
require('dotenv').config();
const { sendUpdateEmail, sendCongratsEmail, sendWelcomeEmail } = require('./utils/emailService');

// 测试数据
const testSubscriber = {
    name: 'Test User',
    email: '649342410@qq.com',
    score: 480,
    currentProgram: 'Canadian Experience Class',
    selectedPrograms: ['Canadian Experience Class', 'Federal Skilled Worker']
};

const testDraw = {
    date: new Date('2024-12-20'),
    details: 'Canadian Experience Class',
    crsScore: 450,
    invitations: 3500
};

async function testUnifiedEmailService() {
    console.log('🚀 测试统一邮件服务...\n');
    console.log('═══════════════════════════════════════════════════\n');
    
    // 测试1: 欢迎邮件
    console.log('📧 测试1: 发送欢迎邮件...');
    const welcomeResult = await sendWelcomeEmail(testSubscriber);
    console.log('结果:', welcomeResult.success ? '✅ 成功' : '❌ 失败');
    if (!welcomeResult.success) console.log('错误:', welcomeResult.error);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 测试2: 更新邮件
    console.log('\n📧 测试2: 发送更新邮件...');
    const updateResult = await sendUpdateEmail(testSubscriber, testDraw);
    console.log('结果:', updateResult.success ? '✅ 成功' : '❌ 失败');
    if (!updateResult.success) console.log('错误:', updateResult.error);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 测试3: 祝贺邮件
    console.log('\n📧 测试3: 发送祝贺邮件...');
    const congratsResult = await sendCongratsEmail(testSubscriber, testDraw);
    console.log('结果:', congratsResult.success ? '✅ 成功' : '❌ 失败');
    if (!congratsResult.success) console.log('错误:', congratsResult.error);
    
    console.log('\n═══════════════════════════════════════════════════');
    console.log('\n🎉 统一邮件服务测试完成！');
    console.log('📬 请检查邮箱 649342410@qq.com\n');
}

testUnifiedEmailService().catch(error => {
    console.error('\n💥 测试过程出错:', error);
    process.exit(1);
});
