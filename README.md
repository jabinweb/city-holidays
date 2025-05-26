# City Holidays - Travel Booking Platform

A comprehensive travel booking platform built with Next.js, Prisma, and PostgreSQL.

## Features

- Holiday package bookings
- Golden Triangle tours
- Taxi services
- Flight, railway, and bus bookings
- User authentication with NextAuth
- Admin dashboard
- Payment integration with Razorpay

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd city-holidays
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Fill in your database URL and other required environment variables.

4. Generate Prisma client and push schema:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

The build script automatically runs `prisma generate` before building to ensure the Prisma client is up to date.

### Environment Variables

Set these in your Vercel dashboard:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `NEXTAUTH_URL` - Your deployment URL
- `RAZORPAY_KEY_ID` - Razorpay key ID (optional)
- `RAZORPAY_KEY_SECRET` - Razorpay secret (optional)

## Tech Stack

- **Framework**: Next.js 14
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Payment**: Razorpay (optional)

## Project Structure

