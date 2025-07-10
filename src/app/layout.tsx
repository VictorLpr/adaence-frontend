import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import './globals.css'
import {AuthProvider} from '../contexts/AuthContext'
import NavbarSelector from '../components/NavbarSelector'
import Footer from '@/components/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TimeWellSpent',
  description: 'Un lien intergénérationnel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <NavbarSelector />
          <div className="flex-1 m-auto flex w-screen flex-col items-center bg-(--background-color) p-2 text-(--foreground)">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
