import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Skip middleware for static files and API routes that should be public
  if (
    nextUrl.pathname.startsWith('/_next') ||
    nextUrl.pathname.startsWith('/api/packages') ||
    nextUrl.pathname.startsWith('/api/auth') ||
    nextUrl.pathname.includes('.') ||
    nextUrl.pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/services',
    '/packages',
    '/contact',
    '/enquiry',
    '/services/taxi',
    '/auth/signin',
    '/auth/signup'
  ]

  // Check if the current path is public
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith('/packages/')

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
    /*
     * Match all request paths except for the ones starting with:
     * - api/packages (public API)
     * - api/auth (auth API)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/packages|api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ]
}
