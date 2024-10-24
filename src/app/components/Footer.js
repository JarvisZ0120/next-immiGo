"use client";
import React from 'react';

// 语言翻译对象
const translations = {
    en: {
        footerText: "© 2024 ImmiGo. All rights reserved. v.2.0.0",
    },
    fr: {
        footerText: "© 2024 ImmiGo. Tous droits réservés. v.2.0.0",
    },
    zh: {
        footerText: "© 2024 ImmiGo。保留所有权利。v.2.0.0",
    },
    hi: {
        footerText: "© 2024 ImmiGo。 सर्वाधिकार सुरक्षित। v.2.0.0",
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