import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//This fnction can be marked as async if using await inside
export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL("/home", request.url));
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
    //return NextResponse.redirect("/");
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
    //return NextResponse.redirect("/login");
  }
}

//See matching paths belowto learn more
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup"],
};
