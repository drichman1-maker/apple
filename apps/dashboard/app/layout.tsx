import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apple Asset Intelligence',
  description: 'Net Ownership Cost Analysis for Apple Hardware',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-[#2997ff] selection:text-white">
        <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-24 relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

          {children}
        </main>
      </body>
    </html>
  );
}
