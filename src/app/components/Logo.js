"use client";
import Link from 'next/link';

const Logo = () => {
    return (
        <div className="flex items-center">
            {/* 自定义图标 */}
            <div className="w-10 h-10 mr-3 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
            </div>
            
            {/* 自定义字体Logo */}
            <Link href="/" className="group relative">
                <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform group-hover:scale-105" 
                      style={{ 
                          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                          letterSpacing: '-0.02em',
                          textShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }}>
                    ImmiGo
                </span>
                
                {/* 装饰性下划线 */}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300 ease-out"></div>
                
                {/* 发光效果 */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-300 rounded-lg"></div>
            </Link>
        </div>
    );
};

export default Logo;
