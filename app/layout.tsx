import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CoinCurator - Rare Coin Aggregator',
  description: 'Discover, track, and collect rare coins from around the world. View PCGS and NGC grades, price history, and build your collection.',
  keywords: 'rare coins, coin collecting, PCGS, NGC, coin grading, numismatics, coin auction, coin prices',
  authors: [{ name: 'CoinCurator Team' }],
  creator: 'CoinCurator',
  publisher: 'CoinCurator',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' }
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://coincurator.com',
    title: 'CoinCurator - Rare Coin Aggregator',
    description: 'Discover, track, and collect rare coins from around the world.',
    siteName: 'CoinCurator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoinCurator - Rare Coin Aggregator',
    description: 'Discover, track, and collect rare coins from around the world.',
    creator: '@coincurator',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarnings>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}