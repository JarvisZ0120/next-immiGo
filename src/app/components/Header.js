"use client";
import Link from 'next/link';
import { useState } from 'react';
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
        dashboard: "仪表板",
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

export default function Header({ setLanguage, language }) {
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const handleLanguageChange = (lang) => {
        setLanguage(lang); // 确保 setLanguage 是有效的函数
        setShowLanguageMenu(false); // 选择后关闭语言菜单
    };

    const currentTranslations = translations[language] || translations.en; // 默认使用英语

    console.log('setLanguage:', setLanguage); // 添加调试信息

    return (
        <header className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Logo /> {/* 添加 Logo */}
                <ul className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 md:text-base"> {/* 修改为响应式布局 */}
                    <li><Link href="/dashboard" className="hover:text-blue-200">{currentTranslations.dashboard}</Link></li>          
                    <li><Link href="https://buymeacoffee.com/immigo" className="hover:text-blue-200">{currentTranslations.donate}</Link></li>
                    <li><Link href="/about" className="hover:text-blue-200">{currentTranslations.about}</Link></li>
                    <li>
                        <button onClick={() => setShowLanguageMenu(!showLanguageMenu)} className="hover:text-blue-200">
                            {currentTranslations.language}
                        </button>
                        {showLanguageMenu && (
                            <div className="absolute bg-blue-600 text-white mt-2 rounded shadow-lg">
                                <button onClick={() => handleLanguageChange('en')} className="block px-4 py-2">English</button>
                                <button onClick={() => handleLanguageChange('fr')} className="block px-4 py-2">French</button>
                                <button onClick={() => handleLanguageChange('zh')} className="block px-4 py-2">Chinese</button>
                                <button onClick={() => handleLanguageChange('hi')} className="block px-4 py-2">Hindi</button>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}