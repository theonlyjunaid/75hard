import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: '75Hard Tracker',
  description: 'This is a 75Hard Tracker built for the 75Hard Challenge.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
