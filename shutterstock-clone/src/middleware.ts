import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyJose } from "./db/helpers/jwt";

export async function middleware(request: NextRequest) {
  const authorization = cookies().get("Authorization");
  // console.log("####### ", authorization);

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (authorization?.value) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/register")) {
    if (authorization?.value) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    if (!authorization?.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    // console.log("middleware auth", authorization);

    if (!authorization?.value) {
      return Response.json(
        {
          message: "unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    const [type, token] = authorization.value.split(" ");
    // console.log(type);
    // console.log(token);

    if (type !== "Bearer") {
      return Response.json(
        {
          message: "Invalid token",
        },
        {
          status: 401,
        }
      );
    }
    const decoded = await verifyJose<{
      _id: string;
      email: string;
    }>(token);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-email", decoded.email);
    requestHeaders.set("x-id", decoded._id);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    // console.log("di middlleware respon", response);

    return response;
  }
}
export const config = {
  matcher: ["/api/wishlist/:path*", "/wishlist", "/login", "/register"],
};
