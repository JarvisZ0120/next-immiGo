"use client";
import Link from 'next/link';

const Logo = () => {
    return (
        <div className="flex items-center">
            <img src="/favicon.ico" alt="Logo" className="w-10 h-10 mr-2" /> {/* 添加 favicon.ico */}
            <Link href="/" className="text-3xl font-bold text-black hover:text-gray-700 transition-colors" style={{ fontFamily: 'Baguette Script, cursive' }}>
                ImmiGo
            </Link>
        </div>
    );
};

export default Logo;
