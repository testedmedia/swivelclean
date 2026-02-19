'use client'

import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/nav/navbar'
import { Footer } from '@/components/nav/footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <title>Ready Rental Cleaning — Premium Airbnb Turnover Cleaning in LA</title>
        <meta
          name="description"
          content="Professional turnover and deep cleaning for Airbnb & short-term rental hosts in Los Angeles. Book in 60 seconds. Guaranteed spotless."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Ready Rental Cleaning — Premium Airbnb Turnover Cleaning" />
        <meta
          property="og:description"
          content="Professional turnover and deep cleaning for LA Airbnb hosts. Fast, reliable, trusted by 200+ hosts."
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        {!isAdmin && <Navbar />}
        <main className={isAdmin ? '' : 'pt-16'}>{children}</main>
        {!isAdmin && <Footer />}
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: 'rounded-xl shadow-depth-3 border border-border/40 bg-background',
              title: 'font-semibold text-foreground',
              description: 'text-muted-foreground',
            },
          }}
        />
      </body>
    </html>
  )
}
