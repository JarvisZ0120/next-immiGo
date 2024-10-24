"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import Logo from './Logo'; // 导入 Logo 组件

// 语言翻译对象
const translations = {
    en: {
        dashboard: "Dashboard",
        donate: "Donate",
        about: "About",
        language: "Language",
    },
    fr: {
        dashboard: "Tableau de bord",
        donate: "Faire un don",
        about: "À propos",
        language: "Langue",
    },
    zh: {
        dashboard: "数据板",
        donate: "捐赠",
        about: "关于",
        language: "语言",
    },
    hi: {
        dashboard: "डैशबोर्ड",
        donate: "दान करें",
        about: "के बारे में",
        language: "भाषा",
    },
};


const navigation = [
    { name: 'dashboard', href: '/dashboard' },
    { name: 'donate', href: 'https://buymeacoffee.com/immigo' },
    { name: 'about', href: '/about' },
]


// 语言翻译对象

export default function Header({ setLanguage, language }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const handleLanguageChange = (lang) => {
        setLanguage(lang); // 确保 setLanguage 是有效的函数
        setShowLanguageMenu(false); // 选择后关闭语言菜单
    };

    const currentTranslations = translations[language] || translations.en; // 默认使用英语

    console.log('setLanguage:', setLanguage); // 添加调试信息

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Logo /> {/* 添加 Logo */}
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                            {currentTranslations[item.name]}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">


                    <li>
                        <button onClick={() => setShowLanguageMenu(!showLanguageMenu)} className=" rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {currentTranslations.language}
                        </button>
                        {showLanguageMenu && (
                            <div className="absolute bg-indigo-600 text-white mt-2 rounded shadow-lg">
                                <button onClick={() => handleLanguageChange('en')} className="block px-4 py-2">English</button>
                                <button onClick={() => handleLanguageChange('fr')} className="block px-4 py-2">French</button>
                                <button onClick={() => handleLanguageChange('zh')} className="block px-4 py-2">Chinese</button>
                                <button onClick={() => handleLanguageChange('hi')} className="block px-4 py-2">Hindi</button>
                            </div>
                        )}
                    </li>



                </div>
            </nav>
            {/* mobile menu */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Logo /> {/* add Logo */}

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {currentTranslations[item.name]}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                      <li>
                        <button onClick={() => setShowLanguageMenu(!showLanguageMenu)} className=" rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {currentTranslations.language}
                        </button>
                        {showLanguageMenu && (
                            <div className="absolute bg-indigo-600 text-white mt-2 rounded shadow-lg">
                                <button onClick={() => handleLanguageChange('en')} className="block px-4 py-2">English</button>
                                <button onClick={() => handleLanguageChange('fr')} className="block px-4 py-2">French</button>
                                <button onClick={() => handleLanguageChange('zh')} className="block px-4 py-2">Chinese</button>
                                <button onClick={() => handleLanguageChange('hi')} className="block px-4 py-2">Hindi</button>
                            </div>
                        )}
                    </li>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>

        </header>
    );
}

