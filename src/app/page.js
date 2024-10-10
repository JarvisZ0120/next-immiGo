"use client";
import Link from 'next/link';
import Header from '/src/app/components/Header';
import Footer from '/src/app/components/Footer';
import Confetti from '/src/app/components/Confetti';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 导入 axios

// 语言翻译对象
const translations = {
    en: {
        welcome: "Welcome to ImmiGo",
        description: "Real-time tracking tool for Canada's Express Entry immigration system",
        about: "About ImmiGo",
        aboutContent: "ImmiGo is a platform dedicated to providing information on Canadian immigration, helping users understand the immigration process and the latest updates.",
        expressEntry: "Express Entry Overview",
        latestDraw: "Latest Draw",
        minimumScore: "Minimum Score:",
        numberOfInvitations: "Number of Invitations:",
        date: "Date:",
        subscribe: "Subscribe for Updates",
        subscribeButton: "Subscribe",
        whyChoose: "Why Choose ImmiGo?",
        realTimeUpdates: "Real-time Updates",
        dataVisualization: "Data Visualization",
        freeService: "Free Service",
        enterEmail: "Enter your email",
        programName: "Program Name:",
        historicalTrends: "Historical Trends",
        ChartsWillBeDisplayedHere: "Charts will be displayed here",
        enterYourName: "Enter your name",
        selectProgramsToFollow: "Select Programs to Follow:",
        areYouCurrentlyInThePool: "Are you currently in the pool?",
        starMessage: "More than 2,002 applicants saved time effortlessly",
        realTimeMsg: "Get the latest Express Entry draw information and score changes.",
        dataMsg: "Understand historical trends and data analysis through intuitive charts.",
        freeMsg: "All core features are completely free to help you achieve your immigration dreams.",  
    },
    fr: {
        welcome: "Bienvenue à ImmiGO",
        description: "Outil de suivi en temps réel pour le système d'immigration Express Entry du Canada",
        about: "À propos d'ImmiGo",
        aboutContent: "ImmiGo est une plateforme dédiée à fournir des informations sur l'immigration canadienne, aidant les utilisateurs à comprendre le processus d'immigration et les dernières mises à jour.",
        expressEntry: "Aperçu de l'Entrée Express",
        latestDraw: "Dernier Tirage",
        minimumScore: "Score Minimum:",
        numberOfInvitations: "Nombre d'Invitations:",
        date: "Date:",
        subscribe: "S'abonner aux mises à jour",
        subscribeButton: "S'abonner",
        whyChoose: "Pourquoi choisir ImmiGo?",
        realTimeUpdates: "Mises à jour en temps réel",
        dataVisualization: "Visualisation des données",
        freeService: "Service gratuit",
        enterEmail: "Entrez votre email",
        programName: "Nom du programme:",
        historicalTrends: "Tendances historiques",
        ChartsWillBeDisplayedHere: "Les graphiques seront affichés ici",
        enterYourName: "Entrez votre nom",
        selectProgramsToFollow: "Sélectionnez les programmes à suivre:",
        areYouCurrentlyInThePool: "Êtes-vous actuellement dans le bassin?",
        starMessage: "Plus de 2 002 candidats ont économisé du temps sans effort",
        realTimeMsg: "Obtenez les dernières informations sur le tirage Express Entry et les changements de score.",
        dataMsg: "Comprenez les tendances historiques et l'analyse des données à travers des graphiques intuitifs.",
        freeMsg: "Toutes les fonctionnalités de base sont entièrement gratuites pour vous aider à réaliser vos rêves d'immigration.",  
    },
    zh: {
        welcome: "欢迎来到 ImmiGO",
        description: "加拿大快速通道移民系统的实时跟踪工具",
        about: "关于 ImmiGo",
        aboutContent: "ImmiGo是一个致力于提供关加拿大移民信息的平台，帮助用户了解移民过程和最新动态。",
        expressEntry: "快速通道概述",
        latestDraw: "最新抽签",
        minimumScore: "最低分数:",
        numberOfInvitations: "邀请人数:",
        date: "日期:",
        subscribe: "订阅更新",
        subscribeButton: "订阅",
        whyChoose: "为什么选择 ImmiGo?",
        realTimeUpdates: "实时更新",
        dataVisualization: "数据可视化",
        freeService: "免费服务",
        enterEmail: "输入您的电子邮件",
        programName: "项目名称:",
        historicalTrends: "历史趋势",
        ChartsWillBeDisplayedHere: "图表将在这里显示",
        enterYourName: "输入您的姓名",
        selectProgramsToFollow: "选择要关注的项目:",
        areYouCurrentlyInThePool: "您目前是否在池中?",
        starMessage: "超过2,002名申请人轻松节省时间",
        realTimeMsg: "获取最新的Express Entry抽签信息和分数变化。",
        dataMsg: "通过直观的图表了解历史趋势和数据分析。",
        freeMsg: "所有核心功能都是完全免费的，以帮助您实现移民梦想。",  
    },
    hi: {
        welcome: "ImmiGO में आपका स्वागत है",
        description: "कनाडा के एक्सप्रेस एंट्री इमिग्रेशन सिस्टम के लिए वास्तविक समय ट्रैकिंग टूल",
        about: "ImmiGo के बारे में",
        aboutContent: "ImmiGo एक ऐसा प्लेटफार्म है जो कनाडाई इमिग्रेशन पर जानकारी प्रदान करने के लिए समर्पित है, उपयोगकर्ताओं को इमिग्रेशन प्क्िया और नवीनतम अपडेट को समझने में मदद करता है।",
        expressEntry: "एक्सप्रेस एंट्री अवलोकन",
        latestDraw: "नवीनतम ड्रॉ",
        minimumScore: "न्यूनतम स्कोर:",
        numberOfInvitations: "आमंत्रणों की संख्या:",
        date: "तारीख:",
        subscribe: "अपडेट के लिए सब्सक्राइब करें",
        subscribeButton: "सब्सक्राइब करें",
        whyChoose: "ImmiGo को क्यों चुनें?",
        realTimeUpdates: "वास्तविक समय अपडेट",
        dataVisualization: "डेटा विज़ुअइज़ेशन",
        freeService: "मुफ्त सेवा",
        enterEmail: "अपना ईमेल दर्ज करें",
        programName: "कार्यक्रम का नाम:",
        historicalTrends: "ऐतिहासिक प्रवृत्तियाँ",
        ChartsWillBeDisplayedHere: "यहाँ चार्ट्स प्रदर्शित किए जाएंगे",
        enterYourName: "अपना नाम दर्ज करें",
        selectProgramsToFollow: "फॉलो करने के लिए कार्यक्रम चुनें:",
        areYouCurrentlyInThePool: "क्या आप वर्तमान में पूल में हैं?",
        starMessage: "2,002 से अधिक आवेदकों ने समय आसानी से बचाया",
        realTimeMsg: "नवीनतम एक्सप्रेस एंट्री ड्रा जानकारी और स्कोर परिवर्तन प्राप्त करें।",
        dataMsg: "समझें इतिहासिक प्रवृत्तियाँ और डेटा विश्लेषण को सरल चार्ट्स के माध्यम से।",
        freeMsg: "आपकी इमिग्रेशन सपनों को पूरा करने में मदद करने के लिए सभी मूल विशेषताएँ पूरी तरह से मुफ्त हैं।",  
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
    'No Program Specified',
    'None'
];

const InfoCard = ({ title, content, link }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h3 className="text-2xl font-semibold mb-4 text-black">{title}</h3>
        <div className="space-y-2">{content}</div>
        {link && (
            <Link href={link} className="mt-4 inline-block text-blue-600 hover:underline">
                View More Details →
            </Link>
        )}
    </div>
);

const InfoCardForLatestDraw = ({ title, content, link }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold mb-4 text-black">{title}</h3>
    <div className="space-y-2">{content}</div>
  </div>
);

export default function Home() {
    const [language, setLanguage] = useState('en'); // 默认语言为英语
    const [name, setName] = useState(''); // 新增姓名状态
    const [email, setEmail] = useState('');
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const [score, setScore] = useState('');
    const [currentProgram, setCurrentProgram] = useState('');
    const [inPool, setInPool] = useState(false); // 新增状态
    const [message, setMessage] = useState(''); // 新增消息状态
    const [showConfetti, setShowConfetti] = useState(false); // 控制撒花效果



    const [latestDraw, setLatestDraw] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json');
          const data = await response.json();
          const rounds = data.rounds || [];

          // 假设你只想获取最新一轮的抽签数据
          const latestRound = rounds[0];

          setLatestDraw({
            drawName: latestRound.drawName,
            drawCRS: latestRound.drawCRS,
            drawSize: latestRound.drawSize,
            drawDate: latestRound.drawDateFull,
          });
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
        const response = await fetch('https://localhost:3001/api/subscribe', {
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
        console.log(result);
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
                          <a href="https://your-link-to-dashboard.com" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Explore Historical Data</a>
                          <p style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
                            Opt out of receiving further emails by clicking on the following
                            <a href="/unsubscribe" onclick="event.preventDefault(); handleUnsubscribe('${email}');" style="color: #007BFF; text-decoration: underline;">Unsubscribe</a> link.
                          </p>
                          <p>ImmiGo, Vancouver, BC, Canada</p>
                      </div>
                      `,
            }),
          });

          const resultSubscribeEmail = await responseSubscribeEmail.json();

          if (resultSubscribeEmail.success) {
            setShowConfetti(true); // 显示撒花效果
            setTimeout(() => {
              setShowConfetti(false); // 几秒后隐藏撒花效果
              }, 3000); // 3秒后隐藏
            setMessage('Subscription successful! Check your email for updates.');
          } else {
            setMessage(resultSubscribeEmail.message || 'Failed to subscribe. Please try again.');
          }
        } else {
          setMessage(result.message || 'Failed to subscribe. Please try again.');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again later.');
        console.error('Error:', error);
      }

      // Reset form fields
      setName('');
      setScore('');
      setEmail('');
      setSelectedPrograms([]);
      setCurrentProgram('');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header setLanguage={setLanguage} language={language} />
            <main className="flex-grow container mx-auto px-4 py-8">
                <section className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 text-black">{translations[language].welcome}</h1>
                    <p className="text-xl text-black mb-8">{translations[language].description}</p>
                    <div className="mt-4 relative">
                        {/* 其他内容 */}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-black">{translations[language].about}</h2>
                    <p className="text-black mb-8 text-center">{translations[language].aboutContent}</p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-black">{translations[language].expressEntry}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <InfoCard
                            title= {translations[language].historicalTrends}
                            content={<p className="text-black">{translations[language].ChartsWillBeDisplayedHere} </p>}
                            link="/dashboard"
                        />
                    </div>
                </section>

                <section id="subscribe" className="bg-white p-8 rounded-lg shadow-md mb-12 text-center">
                    <h2 className="text-3xl font-semibold mb-6 text-black">{translations[language].subscribe}</h2>
                    <form className="max-w-md mx-auto" onSubmit={handleSubscribe}>
                        <div className="flex flex-col mb-4">
                            <input 
                                type="text" 
                                placeholder={translations[language].enterYourName}  // 姓名输入框
                                className="form-input mb-2 text-black border rounded p-2.5 mx-auto w-full" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <input 
                                type="email" 
                                placeholder={translations[language].enterEmail} 
                                className="form-input mb-2 text-black border rounded p-2.5 mx-auto w-full" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-black font-bold">{translations[language].selectProgramsToFollow} </label> {/* 加粗 */}
                            {programs.map((program) => (
                                <label key={program} className="inline-flex items-center mr-4">
                                    <input 
                                        type="checkbox" 
                                        value={program} 
                                        checked={selectedPrograms.includes(program)} 
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSelectedPrograms(prev => 
                                                prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
                                            );
                                        }} 
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2 text-black">{program}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-black font-bold">{translations[language].areYouCurrentlyInThePool} </label> {/* 加粗 */}
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
                                    <label className="block mb-2 text-black">Enter Your Score:</label>
                                    <input 
                                        type="number" 
                                        value={score} 
                                        onChange={(e) => setScore(e.target.value)} 
                                        className="form-input mb-2 text-black border rounded p-2 mx-auto" 
                                        placeholder="Your Score"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-black">Select Your Current Program:</label>
                                    <select 
                                        value={currentProgram} 
                                        onChange={(e) => setCurrentProgram(e.target.value)} 
                                        className="form-select mb-2 text-black border rounded p-2 mx-auto"
                                    >
                                        <option value="">Select a Program</option>
                                        {programs.map((program) => (
                                            <option key={program} value={program}>{program}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                        <button type="submit" className="btn btn-primary text-white bg-blue-600 hover:bg-blue-700 rounded p-2">
                            {translations[language].subscribeButton}
                        </button>
                        {message && <p className="subscribe-message text-red-500 font-bold">{message}</p>}
                        {/* 触发撒花效果 */}
                        {showConfetti && <Confetti />}
                        <div className="testimonial">
                          <span className="stars">⭐⭐⭐⭐⭐</span>
                          <span className="text-black"> {translations[language].starMessage}</span>
                        </div>
                    </form>
                </section>

                <section className="mt-12">
                    <h2 className="text-4xl font-semibold mb-6 text-center text-black">{translations[language].whyChoose}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <div className="flex items-center mb-6">
                                <img src="/icons/realtime.png" alt="Real-time Updates" className="w-16 h-16 mr-4 bg-blue-500" />
                                <h3 className="text-3xl font-semibold text-white">{translations[language].realTimeUpdates}</h3>
                            </div>
                            <p className="text-white">{translations[language].realTimeMsg} </p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-300 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <div className="flex items-center mb-6">
                                <img src="/icons/data-visualization.png" alt="Data Visualization" className="w-16 h-16 mr-4 bg-green-500" />
                                <h3 className="text-3xl font-semibold text-white">{translations[language].dataVisualization}</h3>
                            </div>
                            <p className="text-white">{translations[language].dataMsg}</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-300 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <div className="flex items-center mb-6">
                              <img src="/icons/free-service.png" alt="Free Service" className="w-16 h-16 mr-4 bg-purple-500" />
                              <h3 className="text-3xl font-extrabold text-white">{translations[language].freeService}</h3>
                            </div>  
                            <p className="text-white">{translations[language].freeMsg} </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer language={language} />
        </div>
    );
}