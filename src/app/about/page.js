"use client";
import { useState, useEffect, useRef } from 'react';
import Header from '@/app/components/Header'; // 导入 Header 组件
import Footer from '@/app/components/Footer'; // 导入 Footer 组件
import { translations } from '@/app/about/translations'; // 导入 translations
import { message } from '@/app/about/messages'; // 导入 message
import CustomAccordion from '@/app/components/CustomAccordion'; // 导入 CustomAccordion 组件

export default function About() {
    const accordionRef = useRef(null);

    useEffect(() => {
        if (accordionRef.current) {
            accordionRef.current.style.width = '200px';
        }
    }, []);
    const [language, setLanguage] = useState('en'); // 默认语言为英语
    const currentTranslations = translations[language] || translations.en; // 默认英语

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white">
            {/* header*/}
            <Header setLanguage={setLanguage} language={language} />

            <div className="relative isolate px-6  mt-14 lg:px-8">
                {/* bg color */}
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
                {/* about main page */}
                <main className="flex-grow">
                    <div className="mx-auto max-w-8xl py-32 sm:py-30 lg:py-30">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">Succeed faster</h2>
                                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                                    {currentTranslations.title}
                                </p>
                            </div>
                            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                    {message.map((m) => (
                                        <div key={m.name} className="relative pl-16">
                                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                                    <m.icon aria-hidden="true" className="h-6 w-6 text-white" />
                                                </div>
                                                {currentTranslations[m.name]}
                                            </dt>
                                            <dd className="mt-2 text-base leading-7 text-gray-600">{currentTranslations[m.description]}</dd>
                                            {m.name === 'contact' && (
                                                <a href="mailto:service.immigo@gmail.com" className="text-blue-600 underline">
                                                    service.immigo@gmail.com
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </main>

                {/* bg color */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-0"
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

            {/* Custom Accordion Component */}
            <div className="my-16 mt-0">
                <div className="rounded-lg max-w-4xl mx-auto text-base font-semibold text-gray-900 pl-3">
                    <h3 className="mb-3 text-3xl sm:text-3xl md:text-3xl lg:text-3xl">Frequently Asked Questions</h3>
                </div>
                <CustomAccordion />
            </div>

            {/* Footer */}
            <Footer language={language} />
        </div>
    );
}
