import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Health Index - Your Wellness Technology Guide',
  description: 'Discover the latest in wellness technology including red light therapy, PEMF devices, saunas, and massage guns.',
  keywords: 'wellness, health technology, red light therapy, PEMF, sauna, massage guns',
  authors: [{ name: 'Health Index' }],
  openGraph: {
    title: 'Health Index - Your Wellness Technology Guide',
    description: 'Discover the latest in wellness technology',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[#0a0a0f] text-white antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}