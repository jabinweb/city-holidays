import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { auth } from '@/auth';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: {
    default: 'City Holidays - Best Travel Agency in Agra | Golden Triangle Tours',
    template: '%s | City Holidays'
  },
  description: 'Professional travel services in Agra. Golden Triangle tours, hotel bookings, flight reservations, taxi services. Trusted by 10,000+ travelers. Book now!',
  keywords: 'Agra travel agency, Golden Triangle tours, Taj Mahal tours, Delhi Agra Jaipur packages, flight booking, hotel booking, taxi service Agra',
  authors: [{ name: 'City Holidays' }],
  creator: 'City Holidays',
  publisher: 'City Holidays',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cityholidays.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'City Holidays - Best Travel Agency in Agra',
    description: 'Professional travel services with Golden Triangle tours, bookings, and taxi services. Trusted by 10,000+ travelers.',
    url: 'https://cityholidays.in',
    siteName: 'City Holidays',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'City Holidays - Travel Agency',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'City Holidays - Best Travel Agency in Agra',
    description: 'Professional travel services with Golden Triangle tours and bookings.',
    images: ['/twitter-image.jpg'],
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className={inter.className}>
        <Providers session={session}>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}