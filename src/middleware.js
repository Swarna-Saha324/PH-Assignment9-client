import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  try {
    const res = await fetch(`${origin}/api/auth/get-session`, {
      headers: { cookie: request.headers.get("cookie") || "" },
    });
    const session = await res.json();

    if (!session || !session.user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname); 
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/doctors/:path*", "/dashboard/:path*"],
};