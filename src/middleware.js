import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  console.log("🔹 Middleware triggered!");

  const token = req.cookies.get("authToken")?.value;
  console.log("🟡 Token received:", token);

  const { pathname } = req.nextUrl;
  console.log("🔹 Requested Path:", pathname);

  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_ISSUER = process.env.JWT_ISSUER;
  const JWT_AUDIENCE = process.env.JWT_AUDIENCE;

  if (!JWT_SECRET || !JWT_ISSUER || !JWT_AUDIENCE) {
    console.error("❌ JWT_SECRET, ISSUER, or AUDIENCE is missing in environment variables!");
    return NextResponse.redirect(new URL("/error", req.url));
  }

  if (!token) {
    console.warn("⚠️ No token found! Redirecting to login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    console.log("🟢 Verifying token...");

    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);

    console.log("✅ Token Verified! User:", payload);

    // 🔹 Issuer और Audience Validate करें  
    if (payload.iss !== JWT_ISSUER || payload.aud !== JWT_AUDIENCE) {
      console.warn("⛔ Invalid issuer or audience! Possible attack detected.");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    console.log("🔹 User Role:", payload.role);
    if (!payload.role) {
      console.warn("⚠️ User role not found! Redirecting to login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 🔹 Role-based access control
    const rolePermissions = {
      admin: ["/dashboard"],
      student: ["/student_dash"],
      parent: ["/student_dash"],
    };

    console.log("🔹 Allowed Routes for", payload.role, ":", rolePermissions[payload.role]);

    const allowedRoutes = rolePermissions[payload.role] || [];
    const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));

    console.log("🔹 Is Allowed?", isAllowed);

    if (!isAllowed) {
      console.warn("⛔ Access Denied! Redirecting to /unauthorized");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch (error) {
    console.error("❌ Token verification failed!", error.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("🟢 Access granted! Proceeding to requested page.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/student_dash/:path*"],
};
