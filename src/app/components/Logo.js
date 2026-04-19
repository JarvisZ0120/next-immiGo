"use client";
import Link from 'next/link';

const Logo = () => {
    return (
        <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#d80621] via-[#ff4d6d] to-[#0d9488] shadow-maple ring-2 ring-white/60">
                <span className="relative select-none text-xl leading-none drop-shadow-md" aria-hidden>
                    🍁
                </span>
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" aria-hidden />
            </div>
            <Link
                href="/"
                className="bg-gradient-to-r from-[#1a1523] via-[#c5051a] to-[#0d9488] bg-clip-text text-[22px] font-bold tracking-tight text-transparent hover:opacity-90 transition-opacity"
            >
                ImmiGo
            </Link>
        </div>
    );
};

export default Logo;
