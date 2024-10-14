import localFont from 'next/font/local';
import '../globals.css';
import Navbar from '@/components/includes/Navbar';
import Footer from '@/components/includes/Footer';
import { getDictionary } from './dictionaries';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Movies App',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children, params: { lang } }) {
  const dict = await getDictionary(lang);
  const navDict = dict.Nav; 
  const footerDict = dict.Footer;

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        dir={lang === 'ar' ? 'rtl' : 'ltr'} // Change text direction based on language
      >
        <Navbar lang={lang} dict={navDict} />
        <main className="min-h-[503px]">
          {children}
        </main>
        <Footer dict={footerDict} />
      </body>
    </html>
  );
}
