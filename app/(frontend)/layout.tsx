import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}