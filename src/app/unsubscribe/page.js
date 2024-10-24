"use client";
import { useState } from 'react';
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
    const [message, setMessage] = useState(''); // 消息状态
    const [isSubmitting, setIsSubmitting] = useState(false); // 提交状态

    const handleUnsubscribe = async (email) => {
        setIsSubmitting(true); // 禁用按钮，防止重复提交
        try {
            const response = await fetch('/api/unsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
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
            setIsSubmitting(false); // 重新启用按钮
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header setLanguage={setLanguage} language={language} />
            <main className="flex flex-col items-center justify-center flex-grow">
                <div className="mb-4 mt-4">
                    <input
                        type="email"
                        placeholder={translations[language].enterEmail}
                        className="form-input mb-2 text-black border rounded-md p-2.5 mx-auto w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="button"  // 改为 button 类型
                    className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={() => handleUnsubscribe(email)}  // 绑定点击事件
                    disabled={isSubmitting}  // 按钮禁用逻辑
                >
                    {isSubmitting ? 'Processing...' : translations[language].unsubscribeButton}
                </button>
                {message && <p className="mt-4 text-center text-red-500 font-bold">{message}</p>} 
            </main>
            <Footer language={language} />
        </div>
    );
}

