import { NextResponse } from "next/server";
import { auth } from "./auth";
import { serialize } from "cookie"; // To set cookies

export default async function middleware(req) {
  const path = req.nextUrl.pathname;

  try {
    // Fetch the user session (server-side logic)
    const session = await auth(); // Replace with actual authentication logic
    if (!session) {
      // Redirect to login page if no session exists
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    const email = session.user?.email; // Extract email from session
    if (!email) {
      console.error("No email found in session.");
      return NextResponse.redirect(new URL("/access-denied", req.nextUrl));
    }

    // Check for allowed domain
    const allowedDomain =
      process.env.DOMAIN_NAME?.toLowerCase() || "@uca.ac.ma";
    if (!email.toLowerCase().endsWith(allowedDomain)) {
      // Redirect if the domain is invalid
      return NextResponse.redirect(new URL("/access-denied", req.nextUrl));
    }

    // If session is valid and domain is correct, set a cookie with email
    const response = NextResponse.next();

    return response; // Allow the request to proceed
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/", req.nextUrl)); // Redirect to home on error
  }
}

export const config = {
  matcher: [
    "/home/:path*",
    "/profile",
    "/courses",
    "/language/:path*",
    "/dashboard",
  ],
};
