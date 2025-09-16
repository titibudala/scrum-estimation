import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getJWTPayload, signJWTPayload } from "@workspace/shared/token";

export async function middleware(request: NextRequest) {
  const { userId } = await getJWTPayload<{ userId: string }>(
    request.cookies.get("scrum-estimation-session")?.value,
    process.env.SESSION_TOKEN
  );

  if (!userId) {
    const response = NextResponse.next();
    const signedJwt = await signJWTPayload(
      { userId: crypto.randomUUID() },
      process.env.SESSION_TOKEN
    );

    response.cookies.set({
      name: "scrum-estimation-session",
      value: signedJwt,
      path: "/",
      sameSite: true,
      httpOnly: true,
      secure: true,
      // TODO: In place of setting the cookie for the entire domain - look into how to use sub-subdomains with cloduflare for free.
      domain: process.env.SESSION_COOKIE_DOMAIN,
    });

    return response;
  }
}
