"use client";
import React, { useState } from 'react';
import Header from '/src/app/components/Header'; // 导入 Header 组件
import Footer from '/src/app/components/Footer'; // 导入 Footer 组件
import './About.css'; // 确保此 CSS 文件已创建并定义样式。

// 语言翻译对象
const translations = {
    en: {
        title: "About ImmiGo",
        mission: "Our Mission",
        missionContent: "We aim to be the most trusted source for Canadian Express Entry updates, offering tools and information to help applicants navigate the complex immigration landscape with confidence.",
        team: "Our Team",
        teamContent: "Our team is composed of immigration experts, data analysts, and developers dedicated to providing up-to-date, accurate information.",
        thankYou: "Thank you for choosing ImmiGo as your trusted immigration resource!",
    },
    fr: {
        title: "À propos d'ImmiGo",
        mission: "Notre mission",
        missionContent: "Nous visons à être la source la plus fiable pour les mises à jour de l'Entrée Express canadienne, offrant des outils et des informations pour aider les candidats à naviguer dans le paysage complexe de l'immigration en toute confiance.",
        team: "Notre équipe",
        teamContent: "Notre équipe est composée d'experts en immigration, d'analystes de données et de développeurs dédiés à fournir des informations à jour et précises.",
        thankYou: "Merci d'avoir choisi ImmiGo comme votre ressource d'immigration de confiance !",
    },
    zh: {
        title: "关于 ImmiGo",
        mission: "我们的使命",
        missionContent: "我们的目标是成为加拿大快速通道更新的最可信来源，提供工具和信息，帮助申请者自信地应对复杂的移民环境。",
        team: "我们的团队",
        teamContent: "我们的团队由移民专家、数据分析师和开发人员组成，致力于提供最新、准确的信息。",
        thankYou: "感谢您选择 ImmiGo 作为您可信赖的移民资源！",
    },
    hi: {
        title: "ImmiGO के बारे में",
        mission: "हमारा मिशन",
        missionContent: "हम कनाडाई एक्सप्रेस एंट्री अपडेट के लिए सबसे विश्वसनीय स्रोत बनने का लक्ष्य रखते हैं, उपकरण और जानकारी प्रदान करते हैं ताकि आवेदक जटिल आव्रजन परिदृश्य को आत्मविश्वास के साथ नेविगेट कर सकें।",
        team: "हमारी टीम",
        teamContent: "हमारी टीम में आव्रजन विशेषज्ञ, डेटा विश्लेषक और डेवलपर्स शामिल हैं जो अद्यतन, सटीक जानकारी प्रदान करने के लिए समर्पित हैं।",
        thankYou: "ImmiGo को आपके विश्वसनीय आव्रजन संसाधन के रूप में चुनने के लिए धन्यवाद!",
    },
};

const About = ({ showHeader = true }) => {
    // 设置语言的状态和函数
    const [language, setLanguage] = useState('en'); // 默认语言为英语

    // 获取当前语言的翻译
    const currentTranslations = translations[language] || translations.en; // 默认英语

    return (
        <div className="flex flex-col min-h-screen bg-gray-100"> {/* 使用 Flexbox 布局 */}
            {showHeader && <Header setLanguage={setLanguage} language={language} />} {/* 添加 Header */}
            <div className="about-content flex-grow container mx-auto px-4 py-8"> {/* 使内容区域可扩展 */}
                <h1 className="text-4xl font-bold mb-4 text-center text-black">{currentTranslations.title}</h1> {/* 标题居中，字体变黑 */}
                <p className="text-lg mb-4 text-center text-black"> {/* 段落居中，字体变黑 */}
                    {currentTranslations.missionContent}
                </p>

                <h2 className="text-3xl font-semibold mb-2 text-center text-black">{currentTranslations.mission}</h2> {/* 标题居中，字体变黑 */}
                <p className="text-lg mb-4 text-center text-black">
                    {currentTranslations.missionContent}
                </p>

                <h2 className="text-3xl font-semibold mb-2 text-center text-black">{currentTranslations.team}</h2> {/* 标题居中，字体变黑 */}
                <p className="text-lg mb-4 text-center text-black">
                    {currentTranslations.teamContent}
                </p>

                <p className="text-lg text-center text-black">{currentTranslations.thankYou}</p> {/* 段落居中，字体变黑 */}
            </div>
            <Footer language={language} /> {/* 传递当前语言 */}
        </div>
    );
};

export default About;
