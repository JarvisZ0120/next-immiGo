"use client";
import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { translations } from '@/app/about/translations';
import { message } from '@/app/about/messages';
import CustomAccordion from '@/app/components/CustomAccordion';

export default function About() {
    const [language, setLanguage] = useState('en');
    const currentTranslations = translations[language] || translations.en;

    return (
        <div className="flex min-h-screen flex-col">
            <Header setLanguage={setLanguage} language={language} />

            <main className="flex-grow">
                <div className="apple-section pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-red-200/50 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#b1051a] shadow-sm backdrop-blur-sm">
                            <span aria-hidden>🍁</span> ImmiGo
                        </p>
                        <h1 className="canada-text-gradient mt-4 text-pretty text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px] lg:leading-tight">
                            {currentTranslations.title}
                        </h1>
                    </div>

                    <div className="mx-auto mt-14 max-w-5xl lg:mt-20">
                        <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
                            {message.map((m) => (
                                <div key={m.name} className="canada-card relative p-8 sm:pl-8 sm:pr-8">
                                    <dt className="flex gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d80621] to-[#0d9488] text-white shadow-maple">
                                            <m.icon aria-hidden="true" className="h-6 w-6" />
                                        </div>
                                        <span className="text-[17px] font-semibold leading-snug text-[#1d1d1f] pt-1">
                                            {currentTranslations[m.name]}
                                        </span>
                                    </dt>
                                    <dd className="mt-4 text-[15px] leading-relaxed text-[#6e6e73] sm:mt-5">
                                        {currentTranslations[m.description]}
                                        {m.name === 'contact' && (
                                            <>
                                                {' '}
                                                <a href="mailto:service.immigo@gmail.com" className="font-semibold text-[#d80621] hover:underline">
                                                    service.immigo@gmail.com
                                                </a>
                                            </>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                <div className="apple-section pb-20">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-3xl">
                            {currentTranslations.faqTitle}
                        </h2>
                        <CustomAccordion faqTranslations={currentTranslations.faq} />
                    </div>
                </div>
            </main>

            <Footer language={language} />
        </div>
    );
}
