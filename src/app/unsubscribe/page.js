"use client";
import { useState } from 'react';
import Header from '/src/app/components/Header';
import Footer from '/src/app/components/Footer';

const translations = {
    en: {
        enterEmail: "Enter your email",
        unsubscribeButton: "Unsubscribe",
    },
    fr: {
        enterEmail: "Entrez votre email",
        unsubscribeButton: "Se désabonner",
    },
    zh: {
        enterEmail: "输入您的电子邮件",
        unsubscribeButton: "取消订阅",
    },
    hi: {
        enterEmail: "अपना ईमेल दर्ज करें",
        unsubscribeButton: "अनसब्सक्राइब कीजिए",
    },
};

export default function Unsubscribe() {
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('en');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUnsubscribe = async (emailValue) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/unsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailValue }),
            });

            const result = await response.json();
            if (result.success) {
                setMessage('You have successfully unsubscribed.');
            } else {
                setMessage(result.message || 'Failed to unsubscribe. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header setLanguage={setLanguage} language={language} />
            <main className="flex flex-grow flex-col items-center justify-center px-5 py-16">
                <div className="canada-card w-full max-w-md p-8 sm:p-10">
                    <h1 className="text-center text-2xl font-bold tracking-tight text-[#1a1523]">
                        {translations[language].unsubscribeButton}
                    </h1>
                    <p className="mt-2 text-center text-sm text-[#6e6e73]">
                        {translations[language].enterEmail}
                    </p>
                    <div className="mt-8 space-y-4">
                        <input
                            type="email"
                            placeholder={translations[language].enterEmail}
                            className="w-full rounded-2xl border border-red-100/80 bg-white/90 px-4 py-3 text-[15px] text-[#1a1523] outline-none transition-shadow placeholder:text-[#86868b] focus:border-red-200 focus:ring-2 focus:ring-[#d80621]/25"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="w-full rounded-full bg-gradient-to-r from-[#d80621] via-[#ff4d6d] to-[#ff7a8a] px-4 py-3.5 text-sm font-semibold text-white shadow-maple transition-[filter] hover:brightness-110 disabled:cursor-not-allowed disabled:from-neutral-300 disabled:via-neutral-300 disabled:to-neutral-300 disabled:shadow-none disabled:brightness-100"
                            onClick={() => handleUnsubscribe(email)}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : translations[language].unsubscribeButton}
                        </button>
                        {message && (
                            <p
                                className={`text-center text-sm font-medium ${
                                    message.includes('successfully') ? 'text-green-700' : 'text-red-600'
                                }`}
                            >
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </main>
            <Footer language={language} />
        </div>
    );
}
