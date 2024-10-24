// about page
"use client";
import { useState, useEffect } from 'react';
import { UserGroupIcon, QuestionMarkCircleIcon, EnvelopeIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import Header from '/src/app/components/Header'; // 导入 Header 组件
import Footer from '/src/app/components/Footer'; // 导入 Footer 组件


const message = [
    {
        name: 'know',
        description:
            'knowContent',
        icon: QuestionMarkCircleIcon,
    },
    {
        name: 'mission',
        description:
            'missionContent',
        icon: BriefcaseIcon,
    },
    {
        name: 'team',
        description:
            'teamContent',
        icon: UserGroupIcon,
    },
    {
        name: 'contact',
        description:
            'contactContent',
        icon: EnvelopeIcon,
    },
]



const translations = {
    en: {
        title: "About ImmiGo",
        mission: "Our Mission",
        missionContent: "We aim to be the most trusted source for Canadian Express Entry updates, offering tools and information to help applicants navigate the complex immigration landscape with confidence.",
        team: "Our Team",
        teamContent: "Our team is composed of immigration experts, data analysts, and developers dedicated to providing up-to-date, accurate information.",
        contact: "Contact Us",
        contactContent: "For business inquiries, feel free to reach out to us via email at: ",
        know: "Did You Know? ",
        knowContent: "Over 1,205 people have immigrated to Canada using our expert tools, ensuring you have the best chance of success.",
        thankYou: "Thank you for choosing ImmiGo as your trusted immigration resource!",
    },
    fr: {
        title: "À propos d'ImmiGo",
        mission: "Notre mission",
        missionContent: "Nous visons à être la source la plus fiable pour les mises à jour de l'Entrée Express canadienne, offrant des outils et des informations pour aider les candidats à naviguer dans le paysage complexe de l'immigration en toute confiance.",
        team: "Notre équipe",
        teamContent: "Notre équipe est composée d'experts en immigration, d'analystes de données et de développeurs dédiés à fournir des informations à jour et précises.",
        contact: "Nous contacter",
        contactContent: "Pour les demandes commerciales, n'hésitez pas à nous contacter par e-mail à : ",
        know: "Le saviez-vous ? ",
        knowContent: "Plus de 1 205 personnes ont immigré au Canada en utilisant nos outils d'experts, vous assurant la meilleure chance de succès.",
        thankYou: "Merci d'avoir choisi ImmiGo comme votre ressource d'immigration de confiance !",
    },
    zh: {
        title: "关于 ImmiGo",
        mission: "我们的使命",
        missionContent: "我们的目标是成为加拿大快速通道更新的最可信来源，提供工具和信息，帮助申请者自信地应对复杂的移民环境。",
        team: "我们的团队",
        teamContent: "我们的团队由移民专家、数据分析师和开发人员组成，致力于提供最新、准确的信息。",
        contact: "联系我们",
        contactContent: "如有商务合作，请通过电子邮件与我们联系：",
        know: "你知道吗？",
        knowContent: "超过1,205人通过我们的专业工具移民到加拿大，确保您拥有最佳的成功机会。",
        thankYou: "感谢您选择 ImmiGo 作为您可信赖的移民资源！",
    },
    hi: {
        title: "ImmiGO के बारे में",
        mission: "हमारा मिशन",
        missionContent: "हम कनाडाई एक्सप्रेस एंट्री अपडेट के लिए सबसे विश्वसनीय स्रोत बनने का लक्ष्य रखते हैं, उपकरण और जानकारी प्रदान करते हैं ताकि आवेदक जटिल आव्रजन परिदृश्य को आत्मविश्वास के साथ नेविगेट कर सकें।",
        team: "हमारी टीम",
        teamContent: "हमारी टीम में आव्रजन विशेषज्ञ, डेटा विश्लेषक और डेवलपर्स शामिल हैं जो अद्यतन, सटीक जानकारी प्रदान करने के लिए समर्पित हैं।",
        contact: "संपर्क करें",
        contactContent: "व्यावसायिक पूछताछ के लिए, कृपया हमें ईमेल द्वारा संपर्क करें:",
        know: "क्या आप जानते थे? ",
        knowContent: "1,205 से अधिक लोगों ने हमारे विशेषज्ञ उपकरणों का उपयोग करके कनाडा में आव्रजन किया है, जिससे आपको सफलता का सबसे अच्छा मौका मिलता है।",
        thankYou: "ImmiGo को आपके विश्वसनीय आव्रजन संसाधन के रूप में चुनने के लिए धन्यवाद!",
    },
};



export default function About() {
    const [language, setLanguage] = useState('en'); // 默认语言为英语
    const currentTranslations = translations[language] || translations.en; // 默认英语


    return (
        <div className="bg-white">

            {/* header*/}
            <Header setLanguage={setLanguage} language={language} />

            
            <div className="relative isolate px-6 pt-14 lg:px-8">
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

                {/* bg color */}
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
            
            {/* Footer */}
            <Footer language={language} />
        </div>
    )
}

