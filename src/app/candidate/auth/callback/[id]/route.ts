import { FIFTEEN_MINUTES_IN_SECONDS, THIRTY_DAYS_IN_SECONDS } from "@/constants/dates";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,
  { params }: { params: Promise<{ id: string }> }) => {
    const {id: linkId} = await params;

    const loginUrl = new URL("/candidate/auth/login", req.url);
    const profileUrl = new URL("/candidate/profile", req.url);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-link?link=${linkId}`,
        { cache: "no-store" }
    );

   if (!res.ok) return NextResponse.redirect(loginUrl);

   const result = await res.json();
   if (!result?.status) return NextResponse.redirect(loginUrl);

   // Parse token from backend Set-Cookie header
  const setCookieHeader = res.headers.get("set-cookie");
  const tokenMatch = setCookieHeader?.match(/access_token=([^;]+)/);
  const token = tokenMatch?.[1];

  const refTokenMatch = setCookieHeader?.match(/refresh_token=([^;]+)/);
  const refreshToken = refTokenMatch?.[1];

   if (!token || !refreshToken) return NextResponse.redirect(loginUrl);

  // Set cookie and redirect — this works in a Route Handler
  const cookieStore = await cookies();
  cookieStore.set("access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: FIFTEEN_MINUTES_IN_SECONDS,
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: THIRTY_DAYS_IN_SECONDS
  })

  return NextResponse.redirect(profileUrl);
}