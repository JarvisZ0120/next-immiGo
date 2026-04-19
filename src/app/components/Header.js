"use client";
import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import Logo from './Logo';

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

export default function Header({ setLanguage, language }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setShowLanguageMenu(false);
    };

    const currentTranslations = translations[language] || translations.en;

    return (
        <header className="sticky top-0 inset-x-0 z-50 apple-nav-blur border-b border-red-500/10 bg-white/75 shadow-[0_8px_30px_-18px_rgba(216,6,33,0.18)] backdrop-saturate-150">
            <nav aria-label="Global" className="apple-section flex items-center justify-between py-3 lg:py-4">
                <div className="flex lg:flex-1">
                    <Logo />
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-[#1d1d1f] hover:bg-black/[0.04]"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-10">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm font-semibold text-[#3f3a45] transition-colors hover:text-[#d80621]">
                            {currentTranslations[item.name]}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end relative">
                    <button 
                        type="button"
                        onClick={() => setShowLanguageMenu(!showLanguageMenu)} 
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1a1523] via-[#d80621] to-[#0d9488] px-4 py-2 text-sm font-semibold text-white shadow-maple transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
                    >
                        <svg className="w-4 h-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        {currentTranslations.language}
                        <svg className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${showLanguageMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {showLanguageMenu && (
                        <div className="absolute top-12 right-0 z-50 min-w-[200px] overflow-hidden rounded-2xl border border-red-500/10 bg-white/95 shadow-maple ring-1 ring-white/60 backdrop-blur-md">
                            {[
                                { code: 'en', label: 'English', flag: '🇺🇸' },
                                { code: 'fr', label: 'Français', flag: '🇫🇷' },
                                { code: 'zh', label: '中文', flag: '🇨🇳' },
                                { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
                            ].map(({ code, label, flag }) => (
                                <button 
                                    key={code}
                                    type="button"
                                    onClick={() => handleLanguageChange(code)} 
                                    className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                                        language === code 
                                            ? 'bg-gradient-to-r from-red-50 to-teal-50 font-semibold text-[#1a1523]' 
                                            : 'text-[#424245] hover:bg-red-50/60'
                                    }`}
                                >
                                    <span className="text-lg leading-none">{flag}</span>
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50 bg-black/20 apple-nav-blur" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/95 px-6 py-6 sm:max-w-sm shadow-apple-lg">
                    <div className="flex items-center justify-between">
                        <Logo />
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-full p-2.5 text-[#1d1d1f] hover:bg-black/[0.04]"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-my-6 divide-y divide-black/[0.06]">
                            <div className="space-y-1 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-xl px-3 py-3 text-base font-medium text-[#1d1d1f] hover:bg-[#f5f5f7]"
                                    >
                                        {currentTranslations[item.name]}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <button 
                                    type="button"
                                    onClick={() => setShowLanguageMenu(!showLanguageMenu)} 
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1a1523] via-[#d80621] to-[#0d9488] px-4 py-3 text-sm font-semibold text-white shadow-maple"
                                >
                                    {currentTranslations.language}
                                </button>
                                {showLanguageMenu && (
                                    <div className="mt-3 overflow-hidden rounded-2xl border border-red-500/10 bg-white/90 backdrop-blur-sm">
                                        {[
                                            { code: 'en', label: 'English' },
                                            { code: 'fr', label: 'Français' },
                                            { code: 'zh', label: '中文' },
                                            { code: 'hi', label: 'हिंदी' },
                                        ].map(({ code, label }) => (
                                            <button 
                                                key={code}
                                                type="button"
                                                onClick={() => handleLanguageChange(code)} 
                                                className={`w-full text-left px-4 py-3 text-sm ${language === code ? 'font-semibold text-[#1d1d1f]' : 'text-[#424245]'}`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>

        </header>
    );
}
