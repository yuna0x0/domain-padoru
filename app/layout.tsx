import localFont from 'next/font/local';
import './globals.css'

const Avenir = localFont({ src: './fonts/Avenir.woff2' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={Avenir.className}>{children}</body>
    </html>
  )
}
