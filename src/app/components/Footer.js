"use client";
import React from 'react';

const translations = {
    en: {
        footerText: "© 2026 ImmiGo. All rights reserved. v.3.0.0",
        tagline: "Proudly focused on Canada's Express Entry & IRCC updates.",
    },
    fr: {
        footerText: "© 2026 ImmiGo. Tous droits réservés. v.3.0.0",
        tagline: "Axé sur l'Entrée express et les mises à jour d'IRCC.",
    },
    zh: {
        footerText: "© 2026 ImmiGo。保留所有权利。v.3.0.0",
        tagline: "专注加拿大快速通道与 IRCC 最新动态。",
    },
    hi: {
        footerText: "© 2026 ImmiGo। सर्वाधिकार सुरक्षित। v.3.0.0",
        tagline: "कनाडा एक्सप्रेस एंट्री और IRCC अपडेट पर केंद्रित।",
    },
};

const Footer = ({ language }) => {
    const currentTranslations = translations[language] || translations.en;

    return (
        <footer className="mt-auto overflow-hidden border-t border-red-500/10 bg-white/70 backdrop-blur-md">
            <div className="h-1 w-full bg-gradient-to-r from-[#d80621] via-[#0d9488] to-[#2563eb]" aria-hidden />
            <div className="apple-section py-10">
                <p className="text-center text-[13px] font-medium text-[#5c5666]">{currentTranslations.tagline}</p>
                <p className="mt-3 text-center text-xs tracking-wide text-[#86868b]">{currentTranslations.footerText}</p>
            </div>
        </footer>
    );
};

export default Footer;
