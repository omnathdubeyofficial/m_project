import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req) {
  const token = req.cookies.get("authToken")?.value;
  const { pathname } = req.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = jwtDecode(token);
    const userRole = user?.role?.toLowerCase();

    if (!userRole) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 🔹 Role-based access control
    const rolePermissions = {
      admin: ["/dashboard"],
      student: ["/student_dash"],
      parent: ["/student_dash"],
    };

    const allowedRoutes = rolePermissions[userRole] || [];
    const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/student_dash/:path*"],
};
