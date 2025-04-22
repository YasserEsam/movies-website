import localFont from 'next/font/local'
import '../globals.css'
import Navbar from '@/components/includes/Navbar'
import Footer from '@/components/includes/Footer'
import { getDictionary } from './dictionaries'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata = {
  title: 'Movies App',
  description:
    'Movies TMDB Website A movie exploration platform built with Next.js 14, TMDb API, and Firebase. This website allows users to search for movies, explore detailed information about them, add items to their favorites, and switch between English and Arabic. It also features dynamic light/dark mode support for an enhanced user experience.',
}

export default async function RootLayout({ children, params: { lang } }) {
  const dict = await getDictionary(lang)
  const navDict = dict.Nav
  const footerDict = dict.Footer

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} className="dark" suppressHydrationWarning>
      <head>
        {/* ✅ سكربت تفعيل dark mode قبل React */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const darkMode = localStorage.getItem('darkMode');
                if (darkMode === 'true') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#111]`}>
        <Navbar lang={lang} dict={navDict} />
        <main className="min-h-[503px]">{children}</main>
        <Footer dict={footerDict} />
      </body>
    </html>
  )
}
