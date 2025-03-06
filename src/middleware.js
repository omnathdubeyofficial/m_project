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
  admin: new Set(["/dashboard","/ProfilePage_Management/Admin_Profile","/Security_Staff/Security_Staff_Page", "/dashboard/admin_dashboard", "/student_dash/students_forms/admission_form", "/student_dash/students_forms/attendance_form", "/student_dash/students_forms/holiday_list", "/components/University_Dashboard", "/Exam_Management/Exam_Management_Page","/Event_Management/Event_Management_Page", "/Sports_Management/Sports_Management_Page","/Competition_Management/Competition_Management_Page","/components/University_Dashboard","/dashboard/admin_dashboard","/Lab_Management/Lab_Management_Page","/Library_Management/Library_Management_Page","/Transport_Management/Transport_Management_Page", "/Parents_Management/Parents_Management_Page", "/Students_Management/Students_Management_Page","/Computer_Section/Computer_Management_Page", "/Housekeeping_Staff/Housekeeping_Staff_Page", "/Report_Management/Report_Management_Page", "/Notification_Management/Notification_Management_Page", "/Fee_Management/Fee_Management_Page", "/Admission_Management/Admission_Management_Page", "/Event_Management/Event_Management_Page/Event_Creation_Form"]),
  student: new Set(["/student_dash","/ProfilePage_Management/Admin_Profile", "/view_courses"]),
  parent: new Set(["/parents_dash","/ProfilePage_Management/Admin_Profile", "/child_progress"]),
  teacher: new Set(["/teacher_dash","/ProfilePage_Management/Admin_Profile", "/manage_classes"]),
  staff: new Set(["/staff_dash","/ProfilePage_Management/Admin_Profile", "/attendance"]),
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
    "/dashboard/admin_dashboard/:path*",
    "/components/University_Dashboard/:path*",
    "/Exam_Management/Exam_Management_Page/:path*",
    "/Event_Management/Event_Management_Page/:path*",
    "/Sports_Management/Sports_Management_Page/:path*",
    "/Competition_Management/Competition_Management_Page/:path*",
    "/components/University_Dashboard/:path*",
    "/dashboard/admin_dashboard/:path*",
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
    "/ProfilePage_Management/Admin_Profile/:path*",
    "/Security_Staff/Security_Staff_Page/:path*",
    "/Lab_Management/Lab_Management_Page/:path*",
    "/Library_Management/Library_Management_Page/:path*",
    "/Transport_Management/Transport_Management_Page/:path*",
    "/Parents_Management/Parents_Management_Page/:path*",
    "/Students_Management/Students_Management_Page/:path*",
    "/Computer_Section/Computer_Management_Page/:path*",
    "/Housekeeping_Staff/Housekeeping_Staff_Page/:path*",
    "/Report_Management/Report_Management_Page/:path*",
    "/Notification_Management/Notification_Management_Page/:path*",
    "/Fee_Management/Fee_Management_Page/:path*",
    "/Admission_Management/Admission_Management_Page/:path*",
    "/Event_Management/Event_Management_Page/Event_Creation_Form/:path*"
  ],
};
