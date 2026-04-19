'use client';
import React, { useState, useEffect } from 'react';

const ScrollingAdWindow = ({ language = 'en' }) => {
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const ads = [
        {
            id: 1,
            title: {
                en: "Express Entry Success Stories",
                fr: "Histoires de succès d'Entrée express",
                zh: "快速通道成功案例",
                hi: "एक्सप्रेस एंट्री सफलता की कहानियां"
            },
            description: {
                en: "Read how others achieved their Canadian dream through Express Entry",
                fr: "Découvrez comment d'autres ont réalisé leur rêve canadien grâce à l'Entrée express",
                zh: "了解其他人如何通过快速通道实现加拿大梦想",
                hi: "जानें कि कैसे दूसरों ने एक्सप्रेस एंट्री के माध्यम से अपना कनाडाई सपना साकार किया"
            },
            link: "#",
            accent: "border-[#0071e3]"
        },
        {
            id: 2,
            title: {
                en: "Free Immigration Guide",
                fr: "Guide d'immigration gratuit",
                zh: "免费移民指南",
                hi: "मुफ्त आप्रवासन गाइड"
            },
            description: {
                en: "Download our comprehensive guide to Canadian immigration",
                fr: "Téléchargez notre guide complet sur l'immigration canadienne",
                zh: "下载我们的加拿大移民综合指南",
                hi: "कनाडाई आप्रवासन की हमारी व्यापक गाइड डाउनलोड करें"
            },
            link: "#",
            accent: "border-[#1d1d1f]"
        },
        {
            id: 3,
            title: {
                en: "Professional Services",
                fr: "Services professionnels",
                zh: "专业服务",
                hi: "पेशेवर सेवाएं"
            },
            description: {
                en: "Get expert help with your immigration application",
                fr: "Obtenez une aide experte pour votre demande d'immigration",
                zh: "获得移民申请的专业帮助",
                hi: "अपने आप्रवासन आवेदन के लिए विशेषज्ञ सहायता प्राप्त करें"
            },
            link: "#",
            accent: "border-[#424245]"
        },
        {
            id: 4,
            title: {
                en: "CRS Score Calculator",
                fr: "Calculateur de score CRS",
                zh: "CRS分数计算器",
                hi: "CRS स्कोर कैलकुलेटर"
            },
            description: {
                en: "Calculate your Comprehensive Ranking System score instantly",
                fr: "Calculez instantanément votre score du Système de classement global",
                zh: "即时计算您的综合排名系统分数",
                hi: "अपना व्यापक रैंकिंग सिस्टम स्कोर तुरंत गणना करें"
            },
            link: "https://ircc.canada.ca/english/immigrate/skilled/crs-tool.asp",
            accent: "border-[#0071e3]"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [ads.length]);

    const nextAd = () => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    };

    const prevAd = () => {
        setCurrentAdIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
    };

    const closeAd = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    const currentAd = ads[currentAdIndex];

    return (
        <div className="fixed top-[72px] right-3 sm:top-20 sm:right-6 z-40 max-w-[min(100vw-1.5rem,320px)] w-[min(100vw-1.5rem,320px)]">
            <div className={`rounded-2xl border bg-white shadow-apple-lg ring-1 ring-black/[0.04] overflow-hidden ${currentAd.accent} border-l-[3px]`}>
                <div className="flex justify-end px-2 pt-2">
                    <button
                        type="button"
                        onClick={closeAd}
                        className="rounded-full p-1.5 text-[#86868b] hover:bg-black/[0.04] hover:text-[#1d1d1f]"
                        aria-label="Close"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-4 pb-4">
                    <h3 className="text-sm font-semibold text-[#1d1d1f] leading-snug">
                        {currentAd.title[language] || currentAd.title.en}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#6e6e73]">
                        {currentAd.description[language] || currentAd.description.en}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between gap-2">
                        <a
                            href={currentAd.link}
                            target={currentAd.link.startsWith('http') ? '_blank' : '_self'}
                            rel={currentAd.link.startsWith('http') ? 'noopener noreferrer' : ''}
                            className="inline-flex items-center rounded-full bg-[#f5f5f7] px-3 py-1.5 text-xs font-medium text-[#1d1d1f] ring-1 ring-black/[0.06] hover:bg-[#ebebed]"
                        >
                            {language === 'en' ? 'Learn More' : 
                             language === 'fr' ? 'En savoir plus' :
                             language === 'zh' ? '了解更多' :
                             language === 'hi' ? 'और जानें' : 'Learn More'}
                        </a>
                        
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={prevAd}
                                className="rounded-full p-1.5 text-[#6e6e73] hover:bg-black/[0.04]"
                                aria-label="Previous"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={nextAd}
                                className="rounded-full p-1.5 text-[#6e6e73] hover:bg-black/[0.04]"
                                aria-label="Next"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-1 pb-2">
                    {ads.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentAdIndex(index)}
                            className={`h-1.5 rounded-full transition-all ${
                                index === currentAdIndex 
                                    ? 'w-4 bg-[#0071e3]' 
                                    : 'w-1.5 bg-black/[0.15] hover:bg-black/[0.25]'
                            }`}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollingAdWindow;
