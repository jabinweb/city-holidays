import './globals.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "City Holidays - Your Trusted Travel Partner in Agra",
  description: "City Holidays offers holiday packages, flight bookings, railway reservations, bus bookings, and taxi services in Agra and beyond. Book your dream vacation today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}