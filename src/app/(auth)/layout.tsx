import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Discordia',
  description: 'A cooler discord clone',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-full flex items-center justify-center">{children}</main>
  )
}
