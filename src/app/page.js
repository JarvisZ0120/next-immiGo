// home page file
'use client';

import { useState, useEffect } from 'react';
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import Header from '/src/app/components/Header'; // 导入 Header 组件
import Footer from '/src/app/components/Footer'; // 导入 Footer 组件
import { ALL_STREAMS_TOKEN, mergeStreamLists } from '@/constants/subscription';



/** 纯白卡片 + 细纯色边（无外圈渐变，避免底部透过色带） */
const stats = [
    { name: 'Update', value: 'REAL-TIME', borderClass: 'border-[#fca5a5]' },
    { name: 'Visualization', value: 'DATA', borderClass: 'border-[#5eead4]' },
    { name: 'Tracking', value: 'PERSONALIZED', borderClass: 'border-[#93c5fd]' },
    { name: 'Service', value: 'FREE', borderClass: 'border-[#e879f9]' },
];


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
        noSpamMsg: "Promise not to send any spam, and your information will be kept secure and confidential.",
        allStreamsLabel: "All Express Entry draws & streams (recommended)",
        allStreamsHint: "Get emailed on every new IRCC round—including streams they add later. Uncheck to follow only certain categories.",
        pickStreamsError: "Please keep “All streams” checked or select at least one category.",
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
        noSpamMsg: "Promesse de ne pas envoyer de spam, et vos informations seront gardées sécurisées et confidentielles.",
        allStreamsLabel: "Tous les tirages et volets d'Entrée express (recommandé)",
        allStreamsHint: "Recevez un courriel pour chaque nouveau tirage — y compris les nouvelles catégories d'IRCC. Décochez pour choisir des volets précis.",
        pickStreamsError: "Cochez « Tous les volets » ou au moins une catégorie.",
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
        noSpamMsg: "承诺不发送任何垃圾邮件，您的信息将被安全和保密地保存。",
        allStreamsLabel: "全部快速通道抽签与类别（推荐）",
        allStreamsHint: "每次有新抽签都会发邮件——包括今后 IRCC 新增的类别。取消勾选后可只订阅指定类别。",
        pickStreamsError: "请勾选「全部」或至少选择一个类别。",
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
        noSpamMsg: "स्पैम न भेजने का वादा, और आपकी जानकारी सुरक्षित और गोपनीय रखी जाएगी।",
        allStreamsLabel: "सभी एक्सप्रेस एंट्री ड्रॉ और स्ट्रीम (अनुशंसित)",
        allStreamsHint: "हर नए ड्रॉ पर ईमेल — भविष्य में IRCC द्वारा जोड़ी गई श्रेणियाँ भी। केवल चुनिंदा श्रेणियाँ चाहिए तो यह विकल्प अनचेक करें।",
        pickStreamsError: "«सभी स्ट्रीम» चुनें या कम से कम एक श्रेणी।",
    },
};

const FALLBACK_STREAMS = [
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
    'No Program Specified',
];

const InfoCardForLatestDraw = ({ title, content }) => (
    <div className="canada-card w-full p-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-50 to-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#b1051a] ring-1 ring-red-200/60">
            <span aria-hidden>🇨🇦</span> Express Entry
        </div>
        <h3 className="mb-5 text-xl font-bold tracking-tight text-[#1a1523]">{title}</h3>
        <div className="space-y-3 text-[15px] leading-relaxed text-[#4a4456]">{content}</div>
    </div>
);





export default function Home() {
    const [language, setLanguage] = useState('en'); // 默认语言为英语
    const [name, setName] = useState(''); // 新增姓名状态
    const [email, setEmail] = useState('');
    const [selectedPrograms, setSelectedPrograms] = useState([ALL_STREAMS_TOKEN]); // 默认：全部类别，有抽签即通知
    const [streamList, setStreamList] = useState(() => mergeStreamLists([], FALLBACK_STREAMS));
    const [score, setScore] = useState('');
    const [currentProgram, setCurrentProgram] = useState('');
    const [inPool, setInPool] = useState(false); // 新增状态
    const [message, setMessage] = useState(''); // 新增消息状态
    const [showConfetti, setShowConfetti] = useState(false); // 控制撒花效果
    const [isSubmitting, setIsSubmitting] = useState(false); // 控制提交状态


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
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch('/api/ircc-streams', { cache: 'no-store' });
                const data = await res.json();
                if (cancelled || !data.streams?.length) return;
                setStreamList(mergeStreamLists(data.streams, FALLBACK_STREAMS));
            } catch {
                /* keep merged fallback */
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 首先尝试从数据库获取最新 draw
                let latestRound = null;
                try {
                    const dbResponse = await fetch('/api/latest-draw', { cache: 'no-store' });
                    if (dbResponse.ok) {
                        const dbData = await dbResponse.json();
                        if (dbData.success && dbData.draw) {
                            latestRound = dbData.draw;
                            console.log('✅ 从数据库获取最新 draw:', latestRound);
                        }
                    }
                } catch (dbError) {
                    console.warn('⚠️ 数据库获取失败，使用 Canada.ca API:', dbError.message);
                }

                // 如果数据库没有数据，从 Canada.ca API 获取
                if (!latestRound) {
                    const timestamp = new Date().getTime();
                    const response = await fetch(`https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json?t=${timestamp}`, {
                        cache: 'no-store',
                        headers: { 'Cache-Control': 'no-cache' }
                    });
                    const data = await response.json();
                    const rounds = data.rounds || [];
                    latestRound = rounds[0];
                    console.log('📡 从 Canada.ca 获取最新 draw');
                }

                const type = (latestRound.drawName || 'No Program Specified').replace(/\(Version \d+\)/g, '').trim();

                setLatestDraw({
                    drawName: type,
                    drawCRS: latestRound.drawCRS,
                    drawSize: latestRound.drawSize,
                    drawDate: latestRound.drawDateFull || latestRound.drawDate,
                });

                // 获取完整的 rounds 数据用于统计（从 Canada.ca）
                const timestamp = new Date().getTime();
                const response = await fetch(`https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json?t=${timestamp}`, {
                    cache: 'no-store'
                });
                const data = await response.json();
                const rounds = data.rounds || [];

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
        
        // 确保form事件绑定在客户端正确执行
        const form = document.querySelector('form');
        if (form && !form.hasAttribute('data-event-bound')) {
            form.addEventListener('submit', handleSubscribe);
            form.setAttribute('data-event-bound', 'true');
            console.log('🔗 Form event listener bound manually');
        }
    }, []);



    const handleSubscribe = async (e) => {
        e.preventDefault();
        console.log('🚀 handleSubscribe called');
        console.log('📝 Form data:', { name, email, score, selectedPrograms, currentProgram });

        if (!email || !name) {
            console.log('❌ Missing required fields');
            setMessage('Please fill in all fields correctly.');
            return;
        }

        if (!selectedPrograms.length) {
            setMessage(translations[language].pickStreamsError);
            return;
        }

        setIsSubmitting(true);
        setMessage('Submitting... Please wait.');

        try {
            console.log('📤 Sending request to /api/subscribe');
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
            console.log('📥 Response received:', response.status, response.statusText);

            const result = await response.json();
            console.log('📋 Subscribe API response:', result);
            
            if (!response.ok) {
                setMessage(result.message || `Failed to subscribe: ${response.status}`);
                return;
            }
            
            if (result.success) {
                // 订阅成功，显示成功消息和撒花效果
                setShowConfetti(true); // 显示撒花效果
                setTimeout(() => {
                    setShowConfetti(false); // 几秒后隐藏撒花效果
                }, 3000); // 3秒后隐藏

                setMessage('Subscription successful! Check your email for updates.');
                
                // 只有在成功时才重置表单字段
                setName('');
                setScore('');
                setEmail('');
                setSelectedPrograms([ALL_STREAMS_TOKEN]);
                setCurrentProgram('');
            } else {
                setMessage(result.message || 'Failed to subscribe. Please try again.');
            }
        } catch (error) {
            console.log('💥 Subscription error caught:', error);
            setMessage('An error occurred. Please try again later.');
            console.error('Subscription error:', error);
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">

            <Header setLanguage={setLanguage} language={language} />

            <div className="relative isolate">
                <div className="apple-section pb-24 pt-10 sm:pb-28 sm:pt-16 lg:pb-32 lg:pt-24">
                    <div className="hidden sm:mb-10 sm:flex sm:justify-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-red-200/60 bg-white/85 px-4 py-2 text-xs font-semibold text-[#5c5666] shadow-md shadow-red-500/10 backdrop-blur-md">
                            <span className="text-base" aria-hidden>🇨🇦</span>
                            <span className="bg-gradient-to-r from-[#b1051a] to-[#0d9488] bg-clip-text text-transparent">
                                Powered by IRCC open data
                            </span>
                        </div>
                    </div>
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="canada-text-gradient text-balance pb-2 text-4xl font-extrabold leading-[1.15] tracking-tight sm:pb-3 sm:text-5xl sm:leading-[1.12] lg:text-[56px]">
                            {translations[language].description}
                        </h1>
                        <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg font-normal leading-relaxed text-[#5c5666] sm:mt-10 sm:text-xl">
                            {translations[language].aboutContent}
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 px-2 pb-6 sm:gap-10 sm:pb-8">
                            <a
                                href="#subscribe"
                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#d80621] via-[#ff4d6d] to-[#ff7a8a] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(216,6,33,0.35)] transition-[filter,transform,box-shadow] hover:brightness-110 hover:shadow-[0_6px_20px_-6px_rgba(216,6,33,0.3)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d80621]"
                            >
                                {translations[language].getStarted}
                            </a>
                            <a href="/dashboard" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-red-200/70 bg-white/80 px-5 py-3 text-sm font-semibold text-[#0d9488] shadow-sm backdrop-blur-sm transition-colors hover:border-teal-300 hover:bg-teal-50/80">
                                {translations[language].learnMore}<span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>
                </div>



                <div className="apple-section pb-12">
                    {/* subscribe section */}
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-2 lg:items-start">
                        <div id="subscribe" className="canada-card p-8 sm:p-10">
                            <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">{translations[language].subscribe}</h2>
                            <p className="mt-3 text-[17px] text-[#6e6e73] leading-relaxed">
                                {translations[language].subscribeContent}
                            </p>
                            <form className="mt-8 max-w-lg" onSubmit={handleSubscribe}>
                                <div className="flex flex-col mb-4">
                                    <input
                                        type="text"
                                        placeholder={translations[language].enterYourName}
                                        className="w-full rounded-2xl border border-red-100/80 bg-white/90 px-4 py-3 text-[15px] text-[#1a1523] placeholder:text-[#86868b] outline-none transition-shadow focus:border-red-200 focus:ring-2 focus:ring-[#d80621]/25"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <input
                                        type="email"
                                        placeholder={translations[language].enterEmail}
                                        className="w-full rounded-2xl border border-red-100/80 bg-white/90 px-4 py-3 text-[15px] text-[#1a1523] placeholder:text-[#86868b] outline-none transition-shadow focus:border-red-200 focus:ring-2 focus:ring-[#d80621]/25"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-3 text-sm font-semibold text-[#1d1d1f]">{translations[language].selectProgramsToFollow}</label>
                                    <div className="grid grid-cols-1 gap-2 rounded-2xl border border-teal-100/70 bg-gradient-to-br from-red-50/40 via-white to-teal-50/40 p-3 sm:grid-cols-2">
                                        <label className="flex cursor-pointer flex-col rounded-xl border border-[#d80621]/35 bg-white/95 p-4 shadow-md shadow-red-500/10 ring-1 ring-red-200/40 sm:col-span-2">
                                            <span className="flex items-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPrograms.includes(ALL_STREAMS_TOKEN)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) setSelectedPrograms([ALL_STREAMS_TOKEN]);
                                                        else setSelectedPrograms([]);
                                                    }}
                                                    className="mt-1 h-4 w-4 shrink-0 rounded border-[#d2d2d7] text-[#d80621] focus:ring-[#d80621]"
                                                />
                                                <span>
                                                    <span className="block text-sm font-semibold text-[#1a1523]">{translations[language].allStreamsLabel}</span>
                                                    <span className="mt-1 block text-xs font-normal leading-relaxed text-[#86868b]">{translations[language].allStreamsHint}</span>
                                                </span>
                                            </span>
                                        </label>
                                        {streamList.map((program) => {
                                            const allOn = selectedPrograms.includes(ALL_STREAMS_TOKEN);
                                            const checked = allOn || selectedPrograms.includes(program);
                                            return (
                                                <label
                                                    key={program}
                                                    className={`flex items-center rounded-xl border p-3 transition-colors ${
                                                        allOn ? 'cursor-not-allowed opacity-55' : 'cursor-pointer hover:bg-white'
                                                    } ${
                                                        checked && !allOn
                                                            ? 'border-[#d80621] bg-white shadow-md shadow-red-500/10 ring-1 ring-red-200/50'
                                                            : 'border-transparent bg-white/70'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        value={program}
                                                        checked={checked}
                                                        disabled={allOn}
                                                        onChange={() => {
                                                            if (allOn) return;
                                                            if (program === 'No Program Specified') {
                                                                setSelectedPrograms((prev) =>
                                                                    prev.includes(program) ? [] : ['No Program Specified']
                                                                );
                                                                return;
                                                            }
                                                            setSelectedPrograms((prev) => {
                                                                const filtered = prev.filter((p) => p !== 'No Program Specified');
                                                                return filtered.includes(program)
                                                                    ? filtered.filter((p) => p !== program)
                                                                    : [...filtered, program];
                                                            });
                                                        }}
                                                        className="h-4 w-4 rounded border-[#d2d2d7] text-[#d80621] focus:ring-[#d80621] disabled:opacity-60"
                                                    />
                                                    <span
                                                        className={`ml-3 text-xs leading-snug sm:text-sm ${
                                                            checked ? 'font-medium text-[#1d1d1f]' : 'text-[#424245]'
                                                        }`}
                                                    >
                                                        {program}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    <p className="mt-2 text-xs text-[#86868b]">
                                        {language === 'en'
                                            ? 'Stream list syncs from IRCC public data—new categories appear here automatically.'
                                            : language === 'fr'
                                              ? 'La liste provient des données publiques d\'IRCC — les nouvelles catégories apparaissent automatiquement.'
                                              : language === 'zh'
                                                ? '类别列表来自 IRCC 公开数据，新类别会自动出现在此。'
                                                : 'IRCC सार्वजनिक डेटा से सूची — नई श्रेणियाँ स्वयं जुड़ती हैं।'}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-semibold text-[#1d1d1f]">{translations[language].areYouCurrentlyInThePool}</label>
                                    <div className="flex items-center gap-6">
                                        <label className="inline-flex items-center gap-2 text-sm text-[#424245] cursor-pointer">
                                            <input
                                                type="radio"
                                                value="yes"
                                                checked={inPool === true}
                                                onChange={() => setInPool(true)}
                                                className="h-4 w-4 border-[#d2d2d7] text-[#d80621] focus:ring-[#d80621]"
                                            />
                                            <span>Yes</span>
                                        </label>
                                        <label className="inline-flex items-center gap-2 text-sm text-[#424245] cursor-pointer">
                                            <input
                                                type="radio"
                                                value="no"
                                                checked={inPool === false}
                                                onChange={() => setInPool(false)}
                                                className="h-4 w-4 border-[#d2d2d7] text-[#d80621] focus:ring-[#d80621]"
                                            />
                                            <span>No</span>
                                        </label>
                                    </div>
                                </div>
                                {inPool && (
                                    <>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-semibold text-[#1d1d1f]">{translations[language].enterYourScore}</label>
                                            <input
                                                type="number"
                                                value={score}
                                                onChange={(e) => setScore(e.target.value)}
                                                className="w-full rounded-2xl border border-teal-100/80 bg-white/90 px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-[#0d9488]/25"
                                                placeholder="Your Score"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-semibold text-[#1d1d1f]">{translations[language].selectYourCurrentProgram}</label>
                                            <select
                                                value={currentProgram}
                                                onChange={(e) => setCurrentProgram(e.target.value)}
                                                className="w-full rounded-2xl border border-teal-100/80 bg-white/90 px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-[#0d9488]/25"
                                            >
                                                <option value="">Select a Program</option>
                                                {streamList.map((program) => (
                                                    <option key={program} value={program}>{program}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className={`w-full rounded-full px-4 py-3.5 text-sm font-semibold text-white shadow-maple transition-[filter,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d80621] ${
                                        isSubmitting 
                                            ? 'cursor-not-allowed bg-[#d2d2d7]' 
                                            : 'bg-gradient-to-r from-[#d80621] via-[#ff4d6d] to-[#ff7a8a] hover:brightness-110 active:scale-[0.99]'
                                    }`}
                                >
                                    {isSubmitting ? 'Submitting...' : translations[language].subscribeButton}
                                </button>
                                {message && (
                                    <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                                        message.includes('successful') || message.includes('成功') 
                                            ? 'border-green-200 bg-green-50 text-green-800' 
                                            : 'border-red-200 bg-red-50 text-red-800'
                                    }`}>
                                        <p className="text-center font-medium">
                                            {message}
                                        </p>
                                    </div>
                                )}
                                {/* {showConfetti && <Confetti />} */}
                            </form>
                        </div>

                        <div className="space-y-6">
                            {/* latest draw info */}
                            <InfoCardForLatestDraw
                                title={translations[language].latestDraw}
                                content={
                                    <>
                                        <p>
                                            <span className="font-semibold text-[#1d1d1f]">{translations[language].programName}</span>{' '}
                                            <span>{latestDraw.drawName}</span>
                                        </p>
                                        <p>
                                            <span className="font-semibold text-[#1d1d1f]">{translations[language].minimumScore}</span>{' '}
                                            <span>{latestDraw.drawCRS}</span>
                                        </p>
                                        <p>
                                            <span className="font-semibold text-[#1d1d1f]">{translations[language].numberOfInvitations}</span>{' '}
                                            <span>{latestDraw.drawSize}</span>
                                        </p>
                                        <p>
                                            <span className="font-semibold text-[#1d1d1f]">{translations[language].date}</span>{' '}
                                            <span>{latestDraw.drawDate ? new Date(latestDraw.drawDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : 'N/A'}</span>
                                        </p>
                                    </>
                                }
                            />

                            {/* Additional info cards */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Quick Stats Card */}
                                <div className="rounded-3xl border border-red-100/70 bg-gradient-to-br from-white via-red-50/30 to-white p-6 shadow-lg shadow-red-500/10 ring-1 ring-red-100/50">
                                    <div className="flex items-center mb-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d80621]/15 to-[#ff6b81]/20 ring-1 ring-red-200/40">
                                            <svg className="h-5 w-5 text-[#b1051a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <h3 className="ml-3 text-[15px] font-semibold text-[#1d1d1f]">
                                            {language === 'en' ? 'Quick Stats' :
                                             language === 'fr' ? 'Statistiques rapides' :
                                             language === 'zh' ? '快速统计' :
                                             language === 'hi' ? 'त्वरित आंकड़े' : 'Quick Stats'}
                                        </h3>
                                    </div>
                                    <div className="space-y-2.5 text-[13px] leading-relaxed text-[#424245]">
                                        <p>
                                            <span className="text-[#6e6e73]">
                                                {language === 'en' ? 'Total Draws This Year:' :
                                                 language === 'fr' ? 'Total des tirages cette année:' :
                                                 language === 'zh' ? '今年总抽签次数:' :
                                                 language === 'hi' ? 'इस वर्ष कुल ड्रॉ:' : 'Total Draws This Year:'}
                                            </span>
                                            <span className="ml-2 font-semibold tabular-nums text-[#1d1d1f]">{drawStats.totalDraws}</span>
                                        </p>
                                        <p>
                                            <span className="text-[#6e6e73]">
                                                {language === 'en' ? 'Average Score:' :
                                                 language === 'fr' ? 'Score moyen:' :
                                                 language === 'zh' ? '平均分数:' :
                                                 language === 'hi' ? 'औसत स्कोर:' : 'Average Score:'}
                                            </span>
                                            <span className="ml-2 font-semibold tabular-nums text-[#1d1d1f]">{drawStats.averageScore}</span>
                                        </p>
                                        <p>
                                            <span className="text-[#6e6e73]">
                                                {language === 'en' ? 'Score Range:' :
                                                 language === 'fr' ? 'Gamme de scores:' :
                                                 language === 'zh' ? '分数范围:' :
                                                 language === 'hi' ? 'स्कोर रेंज:' : 'Score Range:'}
                                            </span>
                                            <span className="ml-2 font-semibold tabular-nums text-[#1d1d1f]">
                                                {drawStats.scoreRange.min}-{drawStats.scoreRange.max}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Next Draw Prediction Card */}
                                <div className="rounded-3xl border border-teal-100/70 bg-gradient-to-br from-white via-teal-50/35 to-white p-6 shadow-lg shadow-teal-500/10 ring-1 ring-teal-100/50">
                                    <div className="flex items-center mb-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0d9488]/15 to-[#5eead4]/25 ring-1 ring-teal-200/50">
                                            <svg className="h-5 w-5 text-[#0f766e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="ml-3 text-[15px] font-semibold text-[#1d1d1f]">
                                            {language === 'en' ? 'AI Prediction' :
                                             language === 'fr' ? 'Prédiction IA' :
                                             language === 'zh' ? 'AI预测' :
                                             language === 'hi' ? 'AI भविष्यवाणी' : 'AI Prediction'}
                                        </h3>
                                    </div>
                                    <div className="space-y-2.5 text-[13px] leading-relaxed text-[#424245]">
                                        <p>
                                            <span className="text-[#6e6e73]">
                                                {language === 'en' ? 'Next Draw Date:' :
                                                 language === 'fr' ? 'Date du prochain tirage:' :
                                                 language === 'zh' ? '下次抽签日期:' :
                                                 language === 'hi' ? 'अगले ड्रॉ की तिथि:' : 'Next Draw Date:'}
                                            </span>
                                            <span className="ml-2 font-semibold tabular-nums text-[#1d1d1f]">
                                                {aiPrediction.nextDrawDate ? 
                                                    new Date(aiPrediction.nextDrawDate).toLocaleDateString() : 
                                                    (language === 'en' ? 'Calculating...' :
                                                     language === 'fr' ? 'Calcul...' :
                                                     language === 'zh' ? '计算中...' :
                                                     language === 'hi' ? 'गणना...' : 'Calculating...')
                                                }
                                            </span>
                                        </p>
                                        <p>
                                            <span className="text-[#6e6e73]">
                                                {language === 'en' ? 'Predicted Score:' :
                                                 language === 'fr' ? 'Score prédit:' :
                                                 language === 'zh' ? '预测分数:' :
                                                 language === 'hi' ? 'भविष्यवाणी स्कोर:' : 'Predicted Score:'}
                                            </span>
                                            <span className="ml-2 font-semibold tabular-nums text-[#1d1d1f]">
                                                {aiPrediction.predictedScoreRange.min}-{aiPrediction.predictedScoreRange.max}
                                            </span>
                                        </p>
                                        <p>
                                            <span className="text-[#6e6e73]">
                                                {language === 'en' ? 'Confidence:' :
                                                 language === 'fr' ? 'Confiance:' :
                                                 language === 'zh' ? '置信度:' :
                                                 language === 'hi' ? 'विश्वास:' : 'Confidence:'}
                                            </span>
                                            <span className="ml-2 font-semibold tabular-nums text-[#1d1d1f]">{aiPrediction.confidence}%</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* feature info */}
                            <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-red-100/60 pt-12 sm:grid-cols-2 lg:pt-4">

                                <div className="flex flex-col items-start">
                                    <div className="rounded-2xl bg-gradient-to-br from-[#d80621]/12 to-[#0d9488]/10 p-3 ring-1 ring-red-200/40">
                                        <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-[#b1051a]" />
                                    </div>
                                    <dt className="mt-4 text-[15px] font-semibold text-[#1d1d1f]">{translations[language].instantNotification}</dt>
                                    <dd className="mt-2 leading-relaxed text-[#6e6e73] text-[15px]">
                                        {translations[language].instantNotificationMsg}
                                    </dd>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="rounded-2xl bg-gradient-to-br from-[#2563eb]/12 to-[#c026d3]/10 p-3 ring-1 ring-blue-200/40">
                                        <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-[#1d4ed8]" />
                                    </div>
                                    <dt className="mt-4 text-[15px] font-semibold text-[#1d1d1f]">{translations[language].noSpam}</dt>
                                    <dd className="mt-2 leading-relaxed text-[#6e6e73] text-[15px]">
                                        {translations[language].noSpamMsg}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

            </div>

            {/* why us info */}
            <div className="border-t border-red-100/50 bg-gradient-to-br from-white/95 via-red-50/25 to-teal-50/30 backdrop-blur-sm">
                <div className="apple-section">
                    <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-x-10 gap-y-10 px-4 py-16 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-12 sm:py-20 lg:[grid-template-columns:repeat(4,minmax(0,1fr))] lg:gap-x-12 lg:gap-y-12 xl:gap-x-16">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex min-h-0 min-w-0 justify-center">
                                <div
                                    className={`box-border w-full max-w-[min(100%,11.5rem)] rounded-2xl border-2 bg-white px-3 py-4 text-center shadow-md shadow-black/[0.06] sm:max-w-[12rem] sm:px-4 sm:py-5 ${stat.borderClass}`}
                                >
                                    <p className="break-words text-balance text-2xl font-bold leading-tight tracking-tight text-[#1a1523] sm:text-3xl">
                                        {stat.value}
                                    </p>
                                    <p className="mt-2 text-[10px] font-bold uppercase leading-snug tracking-[0.18em] text-[#86868b] sm:text-[11px]">
                                        {stat.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer language={language} />
        </div>
    )
}



