import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/context/providers'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'StoreTech - Premium Tech Products',
  description: 'Shop the best tech products with StoreTech. Premium electronics, accessories, and gadgets.',
  
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      {
        url: '/placeholder-logo.png',
        media: '(prefers-color-scheme: light)'
      },
      {
        url: '/placeholder-logo.png',
        media: '(prefers-color-scheme: dark)'
      },
      {
        url: '/placeholder-logo.svg',
        type: 'image/svg+xml'
      }
    ],
    apple: '/placeholder-logo.png'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
