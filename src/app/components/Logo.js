import Link from 'next/link';

const Logo = () => {
    return (
        <Link href="/" className="text-3xl font-bold text-black hover:text-gray-700 transition-colors" style={{ fontFamily: 'Baguette Script, cursive' }}>
            ImmiGo
        </Link>
    );
};

export default Logo;
