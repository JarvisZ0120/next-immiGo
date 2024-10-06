"use client";
import React from 'react';

// 语言翻译对象
const translations = {
    en: {
        footerText: "© 2023 ImmiGo. All rights reserved.",
    },
    fr: {
        footerText: "© 2023 ImmiGo. Tous droits réservés.",
    },
    zh: {
        footerText: "© 2023 ImmiGo。保留所有权利。",
    },
    hi: {
        footerText: "© 2023 ImmiGo。 सर्वाधिकार सुरक्षित।",
    },
};

const Footer = ({ language }) => {
    // 确保 language 有效，使用默认值
    const currentTranslations = translations[language] || translations.en; // 默认使用英语

    return (
        <footer className="bg-gray-800 text-white py-4 text-center">
            <p>{currentTranslations.footerText}</p> {/* 使用 currentTranslations */}
        </footer>
    );
};

export default Footer;