import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'B2B Marketplace',
  description: 'A flexible B2B marketplace prototype',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 