import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getJWTPayload, signJWTPayload } from "@workspace/shared/token";

export async function middleware(request: NextRequest) {
  const { userId } = await getJWTPayload(
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
      domain: "titibudala.ro",
    });

    return response;
  }
}
