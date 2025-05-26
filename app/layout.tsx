import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { auth } from '@/auth';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: 'City Holidays - Premium Travel Services',
  description: 'Professional travel services including Golden Triangle tours, holiday packages, flight bookings, railway reservations, and taxi services.',
  keywords: 'travel, tours, Golden Triangle, Agra, Delhi, Jaipur, flight booking, railway reservation, taxi service',
  authors: [{ name: 'City Holidays' }],
  creator: 'City Holidays',
  publisher: 'City Holidays',
  metadataBase: new URL('https://cityholidays.in'),
  openGraph: {
    title: 'City Holidays - Premium Travel Services',
    description: 'Professional travel services for all your journey needs',
    url: 'https://cityholidays.in',
    siteName: 'City Holidays',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'City Holidays - Premium Travel Services',
    description: 'Professional travel services for all your journey needs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}