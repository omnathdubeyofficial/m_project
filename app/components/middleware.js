// middleware.js
import { NextResponse } from 'next/server';
////Hello
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Example: Protect specific routes
  if (pathname.startsWith('/protected')) {
    const token = request.cookies.get('authToken');

    if (!token) {
      const loginUrl = new URL('/login', request.url); // Redirect to the login page
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'], // Apply middleware to specific routes
};
