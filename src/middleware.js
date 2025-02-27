import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = new Set(["/signup", "/login"]);
const ROLE_DASHBOARD = {
  admin: "/dashboard",
  student: "/student_dash",
  parent: "/parents_dash",
  teacher: "/teacher_dash",
  staff: "/staff_dash",
};

const ROLE_PERMISSIONS = {
  admin: new Set(["/dashboard", "/dashboard/admin_dashboard", "/student_dash/students_forms/admission_form", "/student_dash/students_forms/attendance_form", "/student_dash/students_forms/holiday_list"]),
  student: new Set(["/student_dash", "/view_courses"]),
  parent: new Set(["/parents_dash", "/child_progress"]),
  teacher: new Set(["/teacher_dash", "/manage_classes"]),
  staff: new Set(["/staff_dash", "/attendance"]),
};

// Token Cache (For Fast Access)
const tokenCache = new Map(); // Ideally use Redis or other in-memory DB

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  
  if (PUBLIC_ROUTES.has(pathname)) {
    const token = req.cookies.get("authToken")?.value;
    if (token && pathname === "/login") {
      try {
        const payload = await getCachedToken(token);
        if (payload) {
          return NextResponse.redirect(new URL(ROLE_DASHBOARD[payload.role], req.url));
        }
      } catch (error) {
        // Invalid token - Allow login
      }
    }
    return NextResponse.next();
  }

  const token = req.cookies.get("authToken")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const payload = await getCachedToken(token);
    if (!payload) throw new Error("Token verification failed");

    if (payload.iss !== process.env.JWT_ISSUER || payload.aud !== process.env.JWT_AUDIENCE) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    const userRole = payload.role;
    if (!ROLE_PERMISSIONS[userRole]?.has(pathname)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Optimized Token Verification with Caching
async function getCachedToken(token) {
  if (tokenCache.has(token)) return tokenCache.get(token);

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    
    tokenCache.set(token, payload);
    setTimeout(() => tokenCache.delete(token), 15 * 60 * 1000); // Cache expiry 15 min

    return payload;
  } catch {
    return null;
  }
}

export const config = {
  matcher: [
    "/login/:path*",
    "/dashboard/:path*",
    "/manage_users/:path*",
    "/reports/:path*",
    "/student_dash/:path*",
    "/view_courses/:path*",
    "/parents_dash/:path*",
    "/child_progress/:path*",
    "/teacher_dash/:path*",
    "/manage_classes/:path*",
    "/staff_dash/:path*",
    "/attendance/:path*",
  ],
};
