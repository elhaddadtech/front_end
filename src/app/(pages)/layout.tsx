import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '../../components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Student Dashboard',
  description: 'A comprehensive dashboard for students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={`${inter.className} bg-[#F7F8FA] text-foreground`}>
        <div className="flex flex-col h-screen lg:flex-row">
          <Sidebar showToggle={false} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

