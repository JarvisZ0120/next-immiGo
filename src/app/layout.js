import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ImmiGo-Your Immigration Tracker",
  description: "Track Canada's Express Entry immigration system in real time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased canada-page-bg text-[#1a1523]`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="canada-aurora-overlay pointer-events-none fixed inset-0 z-0" aria-hidden />
        <div className="relative z-[1] min-h-screen">{children}</div>
      </body>
    </html>
  );
}
