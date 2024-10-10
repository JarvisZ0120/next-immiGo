"use client";
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '/src/app/components/Header'; // 导入 Header 组件
import Footer from '/src/app/components/Footer'; //



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
    const [language, setLanguage] = useState('en'); // 默认语言
    const [message, setMessage] = useState(''); // 新增消息状态


    const handleUnsubscribe = async (email) => {
        try {
            const response = await fetch('http://localhost:3001/api/unsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (result.success) {
                alert('You have successfully unsubscribed.');
            } else {
                alert(result.message || 'Failed to unsubscribe. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header setLanguage={setLanguage} language={language} />
            <main onSubmit={handleUnsubscribe} className="flex flex-col items-center justify-center flex-grow">
                <div className="mb-4 mt-4">
                    <input
                        type="email"
                        placeholder={translations[language].enterEmail}
                        className="form-input mb-2 text-black border rounded p-2.5 mx-auto w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary text-white bg-blue-600 hover:bg-blue-700 rounded p-2 mx-auto">
                    {translations[language].unsubscribeButton}
                </button>
            </main>
            <Footer language={language} /> {/* 传递当前语言 */}
        </div>
    );
}
