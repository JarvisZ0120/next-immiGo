'use client';
import React, { useState, useEffect, useRef } from 'react';
// Removed Chart.js imports as we're now using vchart
import Link from 'next/link';
import Header from '/src/app/components/Header'; // 导入 Header 组件
import Footer from '/src/app/components/Footer'; // 导入 Footer 组件
import PieChart from '/src/app/crsScorePieChart/page'; // 导入 Pie chart 组件
import BarLineChart from '/src/app/crsDistributionBarLineChart/page'; // 导入 Bar line chart 组件
import TotalPopulationLineChart from '/src/app/totalPopulationLineChart/page'; // 导入 Total population line chart 组件
import ScrollingAdWindow from '/src/app/components/ScrollingAdWindow'; // 导入滚动广告窗口组件

// Removed Chart.js setup as we're now using vchart

// Removed roundTypeColors as it's no longer needed with vchart components

// 语言翻译对象
const translations = {
    en: {
        dashboard: "Dashboard",
        crsOverTime: "CRS Score Distribution of Candidates Over Time",
        totalCandidates: "Total Number of Candidates Over Time",
        showInvitations: "Show Invitations",
        startDate: "Start Date",
        endDate: "End Date",
    },
    fr: {
        dashboard: "Tableau de bord",
        crsOverTime: "Distribution du score CRS des candidats au fil du temps",
        totalCandidates: "Nombre total de candidats au fil du temps",
        showInvitations: "Afficher les invitations",
        startDate: "Date de début",
        endDate: "Date de fin",
    },
    zh: {
        dashboard: "数据板",
        crsOverTime: "时间内候选人CRS分数分布",
        totalCandidates: "候选人总数随时间变化",
        showInvitations: "显示邀请",
        startDate: "开始日期",
        endDate: "结束日期",
    },
    hi: {
        dashboard: "डैशबोर्ड",
        crsOverTime: "उम्मीदवारों के समय के साथ CRS स्कोर वितरण",
        totalCandidates: "समय के साथ कुल उम्मीदवारों की संख्या",
        showInvitations: "आमंत्रण दिखाएँ",
        startDate: "शुरुआत की तारीख",
        endDate: "अंतिम तिथि",
    },
};

export default function Dashboard() {
    const [language, setLanguage] = useState('en'); // 默认语言

    // Removed old Chart.js data processing logic as we're now using vchart components

    const currentTranslations = translations[language]; // 根据当前语言获取翻译

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header setLanguage={setLanguage} language={language} />
            
            {/* 滚动广告窗口 */}
            <ScrollingAdWindow language={language} />

            <main className="flex-grow relative">
                <div className="relative isolate flex-grow px-4 sm:px-6 pt-8 sm:pt-14 lg:px-14 lg:ml-8">
                    {/* 第一个图表：CRS Score Distribution */}
                    <div className="mb-4 sm:mb-8">
                        <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900 mt-4 sm:mt-8 lg:mt-12 mb-4 px-4">
                            {currentTranslations.crsOverTime}
                        </h2>
                    <BarLineChart pageLanguage={language} />
                </div>

                    {/* 第二个图表：Total Population Line Chart */}
                    <div className="mb-4 sm:mb-8">
                        <TotalPopulationLineChart pageLanguage={language} />
                    </div>

                    {/* 第三个图表：Pie Chart */}
                    <div className="mb-4 sm:mb-8 flex justify-center">
                        <PieChart />
                    </div>

                    {/* 操作按钮 */}
                    <div className="mt-4 sm:mt-8 text-center mb-4 sm:mb-8 mx-auto px-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="https://ircc.canada.ca/english/immigrate/skilled/crs-tool.asp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 text-sm sm:text-base inline-block"
                    >
                        Calculate Your CRS Score
                    </a>
                        <a
                            href="/#subscribe"
                            className="bg-indigo-600 text-white px-4 sm:px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 text-sm sm:text-base inline-block"
                        >
                            Subscribe for Updates
                    </a>
                </div>

                    {/* 背景装饰元素 */}
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
            </main>

            <div className="my-8 sm:my-16 mt-4 sm:mt-10"></div>
            <Footer language={language} />
        </div>
    );
}