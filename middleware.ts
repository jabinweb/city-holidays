import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/services',
    '/packages',
    '/packages/[id]',
    '/contact',
    '/enquiry',
    '/services/taxi',
    '/auth/signin',
    '/auth/signup'
  ]

  // API routes that don't require authentication
  const publicApiRoutes = [
    '/api/auth/register'
  ]

  // Admin routes that require admin role
  const adminRoutes = [
    '/admin'
  ]

  // Check if the current path is public
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith('/packages/') ||
    publicApiRoutes.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith('/api/auth/')

  // Check if the current path is admin
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')

  // If user is not logged in and trying to access protected route
  if (!isLoggedIn && !isPublicRoute) {
    const signInUrl = new URL('/auth/signin', nextUrl.origin)
    signInUrl.searchParams.set('callbackUrl', nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (isLoggedIn && (nextUrl.pathname.startsWith('/auth/'))) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl.origin))
  }

  // Check admin access for admin routes
  if (isAdminRoute && isLoggedIn) {
    if (req.auth?.user?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', nextUrl.origin))
    }
  }

  // Admin routes protection
  if (nextUrl.pathname.startsWith('/admin')) {
    if (!req.auth?.user) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    if (req.auth.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // User dashboard protection
  if (nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/bookings')) {
    if (!req.auth?.user) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Match all request paths except static files and images
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/admin/:path*',
    '/dashboard/:path*',
    '/bookings/:path*'
  ]
}
