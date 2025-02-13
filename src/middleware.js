import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/signup", "/login"]; 

// ✅ Role-Based Access Control (RBAC)
const ROLE_PERMISSIONS = {
  admin: ["/dashboard", "/manage_users", "/reports"],
  student: ["/student_dash", "/view_courses"],
  parent: ["/parents_dash", "/child_progress"],
  teacher: ["/teacher_dash", "/manage_classes"],
  staff: ["/staff_dash", "/attendance"],
};

export async function middleware(req) {
  console.log("🔹 Middleware triggered!");

  const { pathname } = req.nextUrl;
  console.log("🔹 Requested Path:", pathname);


  if (PUBLIC_ROUTES.includes(pathname)) {
    console.log("🟢 Public route accessed. Allowing without authentication.");
    

    const token = req.cookies.get("authToken")?.value;
    if (token && pathname === "/login") {
      console.log("🔹 Already logged in! Redirecting to dashboard.");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  }


  const token = req.cookies.get("authToken")?.value;
  if (!token) {
    console.warn("⚠️ No token found! Redirecting to login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    console.log("🟢 Verifying token...");
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);

    console.log("✅ Token Verified! User:", payload);


    if (payload.iss !== process.env.JWT_ISSUER || payload.aud !== process.env.JWT_AUDIENCE) {
      console.warn("⛔ Invalid token issuer or audience! Redirecting to unauthorized.");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    const userRole = payload.role;
    if (!userRole) {
      console.warn("⚠️ User role not found! Redirecting to login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    console.log("🔹 User Role:", userRole);


    const allowedRoutes = ROLE_PERMISSIONS[userRole] || [];
    const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));

    console.log("🔹 Allowed Routes for", userRole, ":", allowedRoutes);
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
  matcher: [
    "//:path*",
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
