'use client';
import React, { useState, useEffect } from 'react';

const ScrollingAdWindow = ({ language = 'en' }) => {
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // 广告内容数据
    const ads = [
        {
            id: 1,
            title: {
                en: "🚀 Express Entry Success Stories",
                fr: "🚀 Histoires de succès d'Entrée express",
                zh: "🚀 快速通道成功案例",
                hi: "🚀 एक्सप्रेस एंट्री सफलता की कहानियां"
            },
            description: {
                en: "Read how others achieved their Canadian dream through Express Entry",
                fr: "Découvrez comment d'autres ont réalisé leur rêve canadien grâce à l'Entrée express",
                zh: "了解其他人如何通过快速通道实现加拿大梦想",
                hi: "जानें कि कैसे दूसरों ने एक्सप्रेस एंट्री के माध्यम से अपना कनाडाई सपना साकार किया"
            },
            link: "#",
            bgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
            textColor: "text-white"
        },
        {
            id: 2,
            title: {
                en: "📚 Free Immigration Guide",
                fr: "📚 Guide d'immigration gratuit",
                zh: "📚 免费移民指南",
                hi: "📚 मुफ्त आप्रवासन गाइड"
            },
            description: {
                en: "Download our comprehensive guide to Canadian immigration",
                fr: "Téléchargez notre guide complet sur l'immigration canadienne",
                zh: "下载我们的加拿大移民综合指南",
                hi: "कनाडाई आप्रवासन की हमारी व्यापक गाइड डाउनलोड करें"
            },
            link: "#",
            bgColor: "bg-gradient-to-r from-green-500 to-teal-600",
            textColor: "text-white"
        },
        {
            id: 3,
            title: {
                en: "💼 Professional Services",
                fr: "💼 Services professionnels",
                zh: "💼 专业服务",
                hi: "💼 पेशेवर सेवाएं"
            },
            description: {
                en: "Get expert help with your immigration application",
                fr: "Obtenez une aide experte pour votre demande d'immigration",
                zh: "获得移民申请的专业帮助",
                hi: "अपने आप्रवासन आवेदन के लिए विशेषज्ञ सहायता प्राप्त करें"
            },
            link: "#",
            bgColor: "bg-gradient-to-r from-orange-500 to-red-600",
            textColor: "text-white"
        },
        {
            id: 4,
            title: {
                en: "📊 CRS Score Calculator",
                fr: "📊 Calculateur de score CRS",
                zh: "📊 CRS分数计算器",
                hi: "📊 CRS स्कोर कैलकुलेटर"
            },
            description: {
                en: "Calculate your Comprehensive Ranking System score instantly",
                fr: "Calculez instantanément votre score du Système de classement global",
                zh: "即时计算您的综合排名系统分数",
                hi: "अपना व्यापक रैंकिंग सिस्टम स्कोर तुरंत गणना करें"
            },
            link: "https://ircc.canada.ca/english/immigrate/skilled/crs-tool.asp",
            bgColor: "bg-gradient-to-r from-indigo-500 to-blue-600",
            textColor: "text-white"
        }
    ];

    // 自动轮播效果
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
        }, 5000); // 每5秒切换一次

        return () => clearInterval(interval);
    }, [ads.length]);

    // 手动切换广告
    const nextAd = () => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    };

    const prevAd = () => {
        setCurrentAdIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
    };

    // 关闭广告窗口
    const closeAd = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    const currentAd = ads[currentAdIndex];

    return (
        <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 max-w-xs sm:max-w-sm w-full mx-2 sm:mx-4">
            <div className={`${currentAd.bgColor} rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105`}>
                {/* 关闭按钮 */}
                <div className="flex justify-end p-2">
                    <button
                        onClick={closeAd}
                        className="text-white hover:text-gray-200 transition-colors duration-200"
                        aria-label="Close ad"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* 广告内容 */}
                <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                    <h3 className={`${currentAd.textColor} text-sm sm:text-lg font-bold mb-1 sm:mb-2`}>
                        {currentAd.title[language] || currentAd.title.en}
                    </h3>
                    <p className={`${currentAd.textColor} text-xs sm:text-sm mb-3 sm:mb-4 opacity-90`}>
                        {currentAd.description[language] || currentAd.description.en}
                    </p>
                    
                    {/* 操作按钮 */}
                    <div className="flex justify-between items-center">
                        <a
                            href={currentAd.link}
                            target={currentAd.link.startsWith('http') ? '_blank' : '_self'}
                            rel={currentAd.link.startsWith('http') ? 'noopener noreferrer' : ''}
                            className={`${currentAd.textColor} bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200`}
                        >
                            {language === 'en' ? 'Learn More' : 
                             language === 'fr' ? 'En savoir plus' :
                             language === 'zh' ? '了解更多' :
                             language === 'hi' ? 'और जानें' : 'Learn More'}
                        </a>
                        
                        {/* 导航按钮 */}
                        <div className="flex space-x-1 sm:space-x-2">
                            <button
                                onClick={prevAd}
                                className={`${currentAd.textColor} hover:bg-white hover:bg-opacity-20 p-0.5 sm:p-1 rounded-full transition-all duration-200`}
                                aria-label="Previous ad"
                            >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextAd}
                                className={`${currentAd.textColor} hover:bg-white hover:bg-opacity-20 p-0.5 sm:p-1 rounded-full transition-all duration-200`}
                                aria-label="Next ad"
                            >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 进度指示器 */}
                <div className="flex justify-center space-x-1 pb-1.5 sm:pb-2">
                    {ads.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentAdIndex(index)}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                                index === currentAdIndex 
                                    ? 'bg-white' 
                                    : 'bg-white bg-opacity-30 hover:bg-opacity-50'
                            }`}
                            aria-label={`Go to ad ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollingAdWindow;
