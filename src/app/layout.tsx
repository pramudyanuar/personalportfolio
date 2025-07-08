import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pramudyanuar - Frontend Developer Portfolio',
  description: 'A Frontend Developer who loves to build amazing things for the web.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}