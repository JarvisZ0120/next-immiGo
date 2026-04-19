'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '/src/app/components/Header';
import Footer from '/src/app/components/Footer';
import PieChart from '/src/app/crsScorePieChart/page';
import BarLineChart from '/src/app/crsDistributionBarLineChart/page';
import TotalPopulationLineChart from '/src/app/totalPopulationLineChart/page';
import ScrollingAdWindow from '/src/app/components/ScrollingAdWindow';

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
    const [language, setLanguage] = useState('en');
    const currentTranslations = translations[language];

    return (
        <div className="flex min-h-screen flex-col">
            <Header setLanguage={setLanguage} language={language} />

            <ScrollingAdWindow language={language} />

            <main className="flex-grow">
                <div className="apple-section pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pt-14">
                    <div className="mx-auto max-w-[1100px]">
                        <div className="mb-10 text-center sm:mb-12">
                            <p className="inline-flex items-center gap-2 rounded-full border border-red-200/50 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#b1051a] shadow-sm backdrop-blur-sm">
                                <span aria-hidden>🇨🇦</span>
                                {currentTranslations.dashboard}
                            </p>
                            <h1 className="canada-text-gradient mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                                {currentTranslations.crsOverTime}
                            </h1>
                        </div>

                        <section className="mb-10 sm:mb-14">
                            <BarLineChart pageLanguage={language} />
                        </section>

                        <section className="mb-10 sm:mb-14">
                            <TotalPopulationLineChart pageLanguage={language} />
                        </section>

                        <section className="mb-10 flex justify-center sm:mb-14">
                            <div className="w-full max-w-4xl">
                                <PieChart />
                            </div>
                        </section>

                        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                            <a
                                href="https://ircc.canada.ca/english/immigrate/skilled/crs-tool.asp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#d80621] to-[#ff5c7a] px-6 py-3 text-sm font-semibold text-white shadow-maple transition-[filter] hover:brightness-110"
                            >
                                Calculate Your CRS Score
                            </a>
                            <Link
                                href="/#subscribe"
                                className="inline-flex items-center justify-center rounded-full border border-teal-200/70 bg-white/90 px-6 py-3 text-sm font-semibold text-[#0f766e] shadow-sm backdrop-blur-sm transition-colors hover:border-teal-300 hover:bg-teal-50/80"
                            >
                                Subscribe for Updates
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <div className="h-8 sm:h-12" />
            <Footer language={language} />
        </div>
    );
}
