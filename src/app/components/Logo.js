"use client";
import Link from 'next/link';

const Logo = () => {
    return (
        <div className="flex items-center">
            <img src="/favicon.ico" alt="Logo" className="w-9 h-9 mr-2" /> {/* add favicon.ico as logo */}
            <Link href="/" className="text-2xl font-bold text-black hover:text-gray-700 transition-colors" style={{ fontFamily: 'Baguette Script, cursive' }}>
                ImmiGo
            </Link>
        </div>
    );
};

export default Logo;
