// home page file
'use client';

import { useState, useEffect } from 'react';
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import Header from '/src/app/components/Header'; // 导入 Header 组件
import Footer from '/src/app/components/Footer'; // 导入 Footer 组件



const stats = [
    { name: 'Update', value: 'REAL-TIME' },
    { name: 'Visualization', value: 'DATA' },
    { name: 'Tracking', value: 'PERSONALIZED' },
    { name: 'Service', value: 'FREE' },
]


const translations = {
    en: {
        description: "Real-time tracker for Canada's Express Entry immigration system",
        aboutContent: "ImmiGo is a platform dedicated to providing information on Canadian immigration, helping users understand the immigration process and the latest updates.",
        latestDraw: "Latest Draw",
        minimumScore: "Minimum Score:",
        numberOfInvitations: "Number of Invitations:",
        getStarted: "Get started",
        learnMore: "Learn more",
        date: "Date:",
        subscribe: "Subscribe for Updates",
        subscribeContent: "We will provide immediate updates whenever a new draw is made from the EE System.",
        subscribeButton: "Subscribe",
        enterEmail: "Enter your email",
        programName: "Program Name:",
        enterYourName: "Enter your name",
        selectProgramsToFollow: "Select Programs to Follow:",
        areYouCurrentlyInThePool: "Are you currently in the pool?",
        enterYourScore: "Enter Your Score:",
        selectYourCurrentProgram: "Select Your Current Program:",
        instantNotification: "Instant notification",
        instantNotificationMsg: "Get instant updates and never miss out on important news—delivered straight to your inbox!",
        noSpam: "No spam",
        noSpamMsg: "Promise not to send any spam, and your information will be kept secure and confidential."
    },
    fr: {
        description: "Outil de suivi en temps réel pour le système d'immigration Express Entry du Canada",
        aboutContent: "ImmiGo est une plateforme dédiée à fournir des informations sur l'immigration canadienne, aidant les utilisateurs à comprendre le processus d'immigration et les dernières mises à jour.",
        latestDraw: "Dernier Tirage",
        minimumScore: "Score Minimum:",
        numberOfInvitations: "Nombre d'Invitations:",
        getStarted: "Commencer",
        learnMore: "En savoir plus",
        date: "Date:",
        subscribe: "S'abonner aux mises à jour",
        subscribeContent: "Nous fournirons des mises à jour immédiates dès qu'un nouveau tirage sera effectué depuis le système EE.",
        subscribeButton: "S'abonner",
        enterEmail: "Entrez votre email",
        programName: "Nom du programme:",
        enterYourName: "Entrez votre nom",
        selectProgramsToFollow: "Sélectionnez les programmes à suivre:",
        areYouCurrentlyInThePool: "Êtes-vous actuellement dans le bassin?",
        enterYourScore: "Entrez votre score:",
        selectYourCurrentProgram: "Sélectionnez votre programme actuel:",
        instantNotification: "Notification instantanée",
        instantNotificationMsg: "Recevez des mises à jour instantanées et ne manquez jamais d'informations importantes—livrées directement dans votre boîte de réception!",
        noSpam: "Pas de spam",
        noSpamMsg: "Promesse de ne pas envoyer de spam, et vos informations seront gardées sécurisées et confidentielles."
    },
    zh: {
        description: "加拿大快速通道移民系统的实时跟踪工具",
        aboutContent: "ImmiGo是一个致力于提供关加拿大移民信息的平台，帮助用户了解移民过程和最新动态。",
        latestDraw: "最新抽签",
        minimumScore: "最低分数:",
        numberOfInvitations: "邀请人数:",
        getStarted: "开始使用",
        learnMore: "了解更多",
        date: "日期:",
        subscribe: "订阅更新",
        subscribeContent: "每当EE系统有新的抽签时，我们将提供即时更新。",
        subscribeButton: "订阅",
        enterEmail: "输入您的电子邮件",
        programName: "项目名称:",
        enterYourName: "输入您的姓名",
        selectProgramsToFollow: "选择要关注的项目:",
        areYouCurrentlyInThePool: "您目前是否在池中?",
        enterYourScore: "输入您的分数:",
        selectYourCurrentProgram: "选择您的当前项目:",
        instantNotification: "即时通知",
        instantNotificationMsg: "获取即时更新，绝不错过重要消息—直接送到您的收件箱！",
        noSpam: "无垃圾邮件",
        noSpamMsg: "承诺不发送任何垃圾邮件，您的信息将被安全和保密地保存。"
    },
    hi: {
        description: "कनाडा के एक्सप्रेस एंट्री इमिग्रेशन सिस्टम के लिए वास्तविक समय ट्रैकिंग टूल",
        aboutContent: "ImmiGo एक ऐसा प्लेटफार्म है जो कनाडाई इमिग्रेशन पर जानकारी प्रदान करने के लिए समर्पित है, उपयोगकर्ताओं को इमिग्रेशन प्रक्रिया और नवीनतम अपडेट को समझने में मदद करता है।",
        latestDraw: "नवीनतम ड्रॉ",
        minimumScore: "न्यूनतम स्कोर:",
        numberOfInvitations: "आमंत्रणों की संख्या:",
        getStarted: "शुरू करें",
        learnMore: "और जानें",
        date: "तारीख:",
        subscribe: "अपडेट के लिए सब्सक्राइब करें",
        subscribeContent: "हम EE सिस्टम से एक नया ड्रॉ होने पर तुरंत अपडेट प्रदान करेंगे।",
        subscribeButton: "सब्सक्राइब करें",
        enterEmail: "अपना ईमेल दर्ज करें",
        programName: "कार्यक्रम का नाम:",
        enterYourName: "अपना नाम दर्ज करें",
        selectProgramsToFollow: "फॉलो करने के लिए कार्यक्रम चुनें:",
        areYouCurrentlyInThePool: "क्या आप वर्तमान में पूल में हैं?",
        enterYourScore: "अपना स्कोर दर्ज करें:",
        selectYourCurrentProgram: "अपना वर्तमान कार्यक्रम चुनें:",
        instantNotification: "तत्काल सूचना",
        instantNotificationMsg: "तत्काल अपडेट प्राप्त करें और महत्वपूर्ण समाचारों को कभी न चूकें—सीधे आपके इनबॉक्स में!",
        noSpam: "कोई स्पैम नहीं",
        noSpamMsg: "स्पैम न भेजने का वादा, और आपकी जानकारी सुरक्षित और गोपनीय रखी जाएगी।"
    },
};

const programs = [
    'Provincial Nominee Program',
    'Federal Skilled Worker',
    'Canadian Experience Class',
    'Federal Skilled Trades',
    'French language proficiency',
    'STEM occupations',
    'Healthcare occupations',
    'Agriculture and agri-food occupations',
    'Transport occupations',
    'Trade occupations',
    'No Program Specified'
];

const InfoCardForLatestDraw = ({ title, content }) => (
    <div className="bg-blue-50 p-8 rounded-lg shadow-md w-full lg:h-2/5 mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-4 text-black">{title}</h3>
        <div className="space-y-2">{content}</div>
    </div>
);





export default function Home() {
    const [language, setLanguage] = useState('en'); // 默认语言为英语
    const [name, setName] = useState(''); // 新增姓名状态
    const [email, setEmail] = useState('');
    const [selectedPrograms, setSelectedPrograms] = useState([]); // 默认不选择任何项目
    const [score, setScore] = useState('');
    const [currentProgram, setCurrentProgram] = useState('');
    const [inPool, setInPool] = useState(false); // 新增状态
    const [message, setMessage] = useState(''); // 新增消息状态
    const [showConfetti, setShowConfetti] = useState(false); // 控制撒花效果


    const [latestDraw, setLatestDraw] = useState({});
    const [drawStats, setDrawStats] = useState({
        totalDraws: 0,
        averageScore: 0,
        scoreRange: { min: 0, max: 0 },
        lastDrawDate: null
    });
    const [aiPrediction, setAiPrediction] = useState({
        nextDrawDate: null,
        predictedScoreRange: { min: 0, max: 0 },
        confidence: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json');
                const data = await response.json();
                const rounds = data.rounds || [];

                // 获取最新一轮的抽签数据
                const latestRound = rounds[0];
                const type = (latestRound.drawName || 'No Program Specified').replace(/\(Version \d+\)/g, '').trim();

                setLatestDraw({
                    drawName: type,
                    drawCRS: latestRound.drawCRS,
                    drawSize: latestRound.drawSize,
                    drawDate: latestRound.drawDateFull,
                });

                // 计算动态统计数据
                const currentYear = new Date().getFullYear();
                const currentYearRounds = rounds.filter(round => {
                    const drawDate = new Date(round.drawDateFull);
                    return drawDate.getFullYear() === currentYear;
                });

                if (currentYearRounds.length > 0) {
                    const scores = currentYearRounds.map(round => parseInt(round.drawCRS)).filter(score => score > 0 && score < 1000);
                    const totalDraws = currentYearRounds.length;
                    const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
                    const minScore = scores.length > 0 ? Math.min(...scores) : 0;
                    const maxScore = scores.length > 0 ? Math.max(...scores) : 0;

                    setDrawStats({
                        totalDraws,
                        averageScore,
                        scoreRange: { min: minScore, max: maxScore },
                        lastDrawDate: latestRound.drawDateFull
                    });

                    // AI预测逻辑
                    const lastDrawDate = new Date(latestRound.drawDateFull);
                    const daysSinceLastDraw = Math.floor((new Date() - lastDrawDate) / (1000 * 60 * 60 * 24));
                    
                    // 基于历史数据的简单AI预测
                    const recentRounds = rounds.slice(0, 6); // 最近6次抽签
                    const recentScores = recentRounds.map(round => parseInt(round.drawCRS)).filter(score => score > 0 && score < 1000);
                    
                    if (recentScores.length >= 3) {
                        const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
                        
                        // 预测下次抽签日期（通常每2周一次）
                        const nextDrawDate = new Date(lastDrawDate);
                        nextDrawDate.setDate(nextDrawDate.getDate() + 14);
                        
                        // 更合理的预测分数范围
                        const recentMin = Math.min(...recentScores);
                        const recentMax = Math.max(...recentScores);
                        const recentRange = recentMax - recentMin;
                        
                        // 基于最近3次抽签的趋势
                        const lastThreeScores = recentScores.slice(0, 3);
                        const trend = lastThreeScores.length >= 2 ? 
                            (lastThreeScores[0] - lastThreeScores[lastThreeScores.length - 1]) / lastThreeScores.length : 0;
                        
                        // 预测范围：基于最近平均值，考虑趋势，但限制在合理范围内
                        const basePrediction = Math.round(recentAvg + trend * 2);
                        const rangeBuffer = Math.min(30, Math.max(15, recentRange / 2)); // 动态范围缓冲
                        
                        const predictedMin = Math.max(400, Math.min(550, basePrediction - rangeBuffer));
                        const predictedMax = Math.min(600, Math.max(450, basePrediction + rangeBuffer));
                        
                        // 计算置信度（基于数据一致性）
                        const scoreVariance = recentScores.reduce((acc, score) => acc + Math.pow(score - recentAvg, 2), 0) / recentScores.length;
                        const confidence = Math.max(65, Math.min(90, 100 - Math.sqrt(scoreVariance) / 8));

                        setAiPrediction({
                            nextDrawDate: nextDrawDate.toISOString().split('T')[0],
                            predictedScoreRange: { min: predictedMin, max: predictedMax },
                            confidence: Math.round(confidence)
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching draw data:', error);
            }
        };

        fetchData();
    }, []);



    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email || !name) {
            setMessage('Please fill in all fields correctly.');
            return;
        }

        try {
            // 发送订阅请求到后端
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    score,
                    selectedPrograms,
                    currentProgram,
                }),
            });
            console.log(response);

            const result = await response.json();
            console.log('Subscribe API response:', result);
            
            if (!response.ok) {
                setMessage(result.message || `Failed to subscribe: ${response.status}`);
                return;
            }
            
            if (result.success) {
                // 发送订阅确认邮件
                const responseSubscribeEmail = await fetch('/api/sendEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        subject: `Welcome to ImmiGo, ${name}`,
                        message: `
                      <div style="font-family: Arial, sans-serif; text-align: center;">
                          <h2 style="color: #000;">Welcome to ImmiGo</h2>
                          <p>Congratulations! You've subscribed to ImmiGo, the free service that helps you track Canadian Express Entry updates.</p>
                          <p>Here's what you'll get:</p>
                          <ul style="text-align: left; max-width: 600px; margin: 0 auto;">
                              <li><strong><u>Instant notifications for new Express Entry draws.</u></strong> You'll receive an email from us as soon as a new draw in <strong>${selectedPrograms.join(', ')}</strong> is announced.</li>
                              ${inPool ? `<li><strong><u>Quick congratulatory message.</u></strong> You will receive a congratulatory message from us once your score <strong>${score}</strong> in <strong>${currentProgram}</strong> exceeds the new draw's lowest score.</li>` : ''}
                              <li><strong><u>Interactive dashboard to explore all historical data.</u></strong> We've compiled and cleaned Express Entry data to create a comprehensive dashboard for your use. Feel free to explore it at any time.</li>
                          </ul>
                          <a href="https://immigoo.com/dashboard" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Explore Historical Data</a>
                          <p style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
                            Opt out of receiving further emails by clicking on the following
                            <a href="https://immigoo.com/unsubscribe" onclick="event.preventDefault(); handleUnsubscribe('${email}');" style="color: #007BFF; text-decoration: underline;">Unsubscribe</a> link.
                          </p>
                          <p>ImmiGo, Vancouver, BC, Canada</p>
                      </div>
                      `,
                    }),
                });

                const resultSubscribeEmail = await responseSubscribeEmail.json();
                console.log('Send email API response:', resultSubscribeEmail);

                if (resultSubscribeEmail.success) {
                    // TODO: There is a Confetti issue needs to be fixed
                    setShowConfetti(true); // 显示撒花效果
                    setTimeout(() => {
                        setShowConfetti(false); // 几秒后隐藏撒花效果
                    }, 3000); // 3秒后隐藏

                    setMessage('Subscription successful! Check your email for updates.');
                } else {
                    // 即使邮件发送失败，订阅也已经成功了
                    setMessage('Subscription successful! (Email notification may be delayed)');
                    console.warn('Email sending failed but subscription was saved:', resultSubscribeEmail);
                }
            } else {
                setMessage(result.message || 'Failed to subscribe. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
            console.error('Subscription error:', error);
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        }

        // Reset form fields
        setName('');
        setScore('');
        setEmail('');
        setSelectedPrograms([]);
        setCurrentProgram('');
    };

    return (
        <div className="bg-white flex flex-col">

            {/* header*/}
            <Header setLanguage={setLanguage} language={language} />

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            Powered by 🇨🇦 IRCC{' '}
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                            {translations[language].description}
                        </h1>
                        <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                            {translations[language].aboutContent}
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#subscribe"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {translations[language].getStarted}
                            </a>
                            <a href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
                                {translations[language].learnMore}<span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>



                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* subscribe section */}
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div id="subscribe" className="max-w-xl lg:max-w-lg mx-auto p-6 text-center">
                            <h2 className="text-4xl font-semibold tracking-tight text-black">{translations[language].subscribe}</h2>
                            <p className="mt-4 text-lg text-gray-500">
                                {translations[language].subscribeContent}
                            </p>
                            <form className="mt-6 max-w-md" onSubmit={handleSubscribe}>
                                <div className="flex flex-col mb-4">
                                    <input
                                        type="text"
                                        placeholder={translations[language].enterYourName}  // 姓名输入框
                                        className="min-w-0 flex-auto rounded-md border-0 bg-black/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <input
                                        type="email"
                                        placeholder={translations[language].enterEmail}
                                        className="min-w-0 flex-auto rounded-md border-0 bg-black/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-4 text-black font-bold text-lg">{translations[language].selectProgramsToFollow}</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        {programs.map((program) => (
                                            <label 
                                                key={program} 
                                                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white hover:shadow-sm ${
                                                    selectedPrograms.includes(program) 
                                                        ? 'bg-indigo-100 border-2 border-indigo-300' 
                                                        : 'bg-white border-2 border-gray-200'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={program}
                                                    checked={selectedPrograms.includes(program)}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value === 'No Program Specified') {
                                                            // 如果选择"No Program Specified"，则只选择这个选项，取消其他所有选项
                                                            setSelectedPrograms(selectedPrograms.includes(value) ? [] : ['No Program Specified']);
                                                        } else {
                                                            // 如果选择其他选项，则取消"No Program Specified"选项
                                                            setSelectedPrograms(prev => {
                                                                const filtered = prev.filter(p => p !== 'No Program Specified');
                                                                return filtered.includes(value) 
                                                                    ? filtered.filter(p => p !== value) 
                                                                    : [...filtered, value];
                                                            });
                                                        }
                                                    }}
                                                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                                                />
                                                <span className={`ml-3 text-sm font-medium ${
                                                    selectedPrograms.includes(program) ? 'text-indigo-900' : 'text-gray-700'
                                                }`}>
                                                    {program}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">
                                        {language === 'en' ? 'Select one or more programs to follow for updates' :
                                         language === 'fr' ? 'Sélectionnez un ou plusieurs programmes à suivre pour les mises à jour' :
                                         language === 'zh' ? '选择一个或多个项目来获取更新' :
                                         language === 'hi' ? 'अपडेट के लिए एक या अधिक कार्यक्रम चुनें' : 
                                         'Select one or more programs to follow for updates'}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-black font-bold">{translations[language].areYouCurrentlyInThePool}</label>
                                    <div className="flex items-center mb-4 justify-center">
                                        <label className="mr-4 text-black">
                                            <input
                                                type="radio"
                                                value="yes"
                                                checked={inPool === true}
                                                onChange={() => setInPool(true)}
                                                className="form-radio text-black"
                                            />
                                            <span className="ml-2">Yes</span>
                                        </label>
                                        <label className="text-black">
                                            <input
                                                type="radio"
                                                value="no"
                                                checked={inPool === false}
                                                onChange={() => setInPool(false)}
                                                className="form-radio text-black"
                                            />
                                            <span className="ml-2">No</span>
                                        </label>
                                    </div>
                                </div>
                                {inPool && (
                                    <>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-black font-bold">{translations[language].enterYourScore}</label>
                                            <input
                                                type="number"
                                                value={score}
                                                onChange={(e) => setScore(e.target.value)}
                                                className="min-w-0 flex-auto rounded-md border-0 bg-black/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                placeholder="Your Score"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-black font-bold">{translations[language].selectYourCurrentProgram}</label>
                                            <select
                                                value={currentProgram}
                                                onChange={(e) => setCurrentProgram(e.target.value)}
                                                className="min-w-0 flex-auto rounded-md border-0 bg-black/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Select a Program</option>
                                                {programs.map((program) => (
                                                    <option key={program} value={program}>{program}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}
                                <button type="submit" className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200">
                                    {translations[language].subscribeButton}
                                </button>
                                {message && (
                                    <div className={`mt-4 p-4 rounded-lg ${
                                        message.includes('successful') || message.includes('成功') 
                                            ? 'bg-green-100 border-2 border-green-500' 
                                            : 'bg-red-100 border-2 border-red-500'
                                    }`}>
                                        <p className={`text-center font-semibold ${
                                            message.includes('successful') || message.includes('成功')
                                                ? 'text-green-700' 
                                                : 'text-red-700'
                                        }`}>
                                            {message}
                                        </p>
                                    </div>
                                )}
                                {/* {showConfetti && <Confetti />} */}
                            </form>
                        </div>

                        <div className="mt-5">
                            {/* latest draw info */}
                            <InfoCardForLatestDraw
                                title={translations[language].latestDraw}
                                content={
                                    <>
                                        <p className="text-black">
                                            <span className="font-semibold">{translations[language].programName}</span> {latestDraw.drawName}
                                        </p>
                                        <p className="text-black">
                                            <span className="font-semibold">{translations[language].minimumScore}</span> {latestDraw.drawCRS}
                                        </p>
                                        <p className="text-black">
                                            <span className="font-semibold">{translations[language].numberOfInvitations}</span> {latestDraw.drawSize}
                                        </p>
                                        <p className="text-black">
                                            <span className="font-semibold">{translations[language].date}</span> {latestDraw.drawDate}
                                        </p>
                                    </>
                                }
                            />

                            {/* Additional info cards */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Quick Stats Card */}
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md border border-blue-200">
                                    <div className="flex items-center mb-3">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <h3 className="ml-3 text-lg font-semibold text-gray-900">
                                            {language === 'en' ? 'Quick Stats' :
                                             language === 'fr' ? 'Statistiques rapides' :
                                             language === 'zh' ? '快速统计' :
                                             language === 'hi' ? 'त्वरित आंकड़े' : 'Quick Stats'}
                                        </h3>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                {language === 'en' ? 'Total Draws This Year:' :
                                                 language === 'fr' ? 'Total des tirages cette année:' :
                                                 language === 'zh' ? '今年总抽签次数:' :
                                                 language === 'hi' ? 'इस वर्ष कुल ड्रॉ:' : 'Total Draws This Year:'}
                                            </span>
                                            <span className="ml-2 font-bold text-blue-600">{drawStats.totalDraws}</span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                {language === 'en' ? 'Average Score:' :
                                                 language === 'fr' ? 'Score moyen:' :
                                                 language === 'zh' ? '平均分数:' :
                                                 language === 'hi' ? 'औसत स्कोर:' : 'Average Score:'}
                                            </span>
                                            <span className="ml-2 font-bold text-blue-600">{drawStats.averageScore}</span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                {language === 'en' ? 'Score Range:' :
                                                 language === 'fr' ? 'Gamme de scores:' :
                                                 language === 'zh' ? '分数范围:' :
                                                 language === 'hi' ? 'स्कोर रेंज:' : 'Score Range:'}
                                            </span>
                                            <span className="ml-2 font-bold text-blue-600">
                                                {drawStats.scoreRange.min}-{drawStats.scoreRange.max}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Next Draw Prediction Card */}
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg shadow-md border border-green-200">
                                    <div className="flex items-center mb-3">
                                        <div className="bg-green-100 p-2 rounded-lg">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="ml-3 text-lg font-semibold text-gray-900">
                                            {language === 'en' ? 'AI Prediction' :
                                             language === 'fr' ? 'Prédiction IA' :
                                             language === 'zh' ? 'AI预测' :
                                             language === 'hi' ? 'AI भविष्यवाणी' : 'AI Prediction'}
                                        </h3>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                {language === 'en' ? 'Next Draw Date:' :
                                                 language === 'fr' ? 'Date du prochain tirage:' :
                                                 language === 'zh' ? '下次抽签日期:' :
                                                 language === 'hi' ? 'अगले ड्रॉ की तिथि:' : 'Next Draw Date:'}
                                            </span>
                                            <span className="ml-2 font-bold text-green-600">
                                                {aiPrediction.nextDrawDate ? 
                                                    new Date(aiPrediction.nextDrawDate).toLocaleDateString() : 
                                                    (language === 'en' ? 'Calculating...' :
                                                     language === 'fr' ? 'Calcul...' :
                                                     language === 'zh' ? '计算中...' :
                                                     language === 'hi' ? 'गणना...' : 'Calculating...')
                                                }
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                {language === 'en' ? 'Predicted Score:' :
                                                 language === 'fr' ? 'Score prédit:' :
                                                 language === 'zh' ? '预测分数:' :
                                                 language === 'hi' ? 'भविष्यवाणी स्कोर:' : 'Predicted Score:'}
                                            </span>
                                            <span className="ml-2 font-bold text-green-600">
                                                {aiPrediction.predictedScoreRange.min}-{aiPrediction.predictedScoreRange.max}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                {language === 'en' ? 'Confidence:' :
                                                 language === 'fr' ? 'Confiance:' :
                                                 language === 'zh' ? '置信度:' :
                                                 language === 'hi' ? 'विश्वास:' : 'Confidence:'}
                                            </span>
                                            <span className="ml-2 font-bold text-green-600">{aiPrediction.confidence}%</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* feature info */}
                            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2 mt-36" >

                                <div className="flex flex-col items-start">
                                    <div className="rounded-md bg-black/5 p-2 ring-1 ring-black/10">
                                        <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-black" />
                                    </div>
                                    <dt className="mt-4 font-semibold text-black">{translations[language].instantNotification}</dt>
                                    <dd className="mt-2 leading-7 text-gray-500">
                                        {translations[language].instantNotificationMsg}
                                    </dd>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="rounded-md bg-black/5 p-2 ring-1 ring-black/10">
                                        <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-black" />
                                    </div>
                                    <dt className="mt-4 font-semibold text-black">{translations[language].noSpam}</dt>
                                    <dd className="mt-2 leading-7 text-gray-500">
                                        {translations[language].noSpamMsg}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />
                </div>

            </div>

            {/* why us info */}
            <div className="mx-auto max-w-2xl lg:mx-auto lg:max-w-none">
                <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 justify-items-center mb-16">
                    {stats.map((stat) => (
                        <div key={stat.name} className="flex flex-col-reverse gap-1 text-center">
                            <dt className="text-xl text-black">{stat.name}</dt>
                            <dd className="text-4xl font-semibold tracking-tight text-black">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
            <Footer language={language} />
        </div>
    )
}



