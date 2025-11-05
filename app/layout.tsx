import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shop Date Save',
  description: 'Save your shopping dates and items',
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
