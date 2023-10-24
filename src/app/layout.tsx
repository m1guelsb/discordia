import { ThemeProvider } from '@/components/providers'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Discordia',
  description: 'A cooler discord clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={fontSans.className}>
          <ThemeProvider
            defaultTheme="dark"
            attribute="class"
            enableSystem={false}
            storageKey="discordia-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
