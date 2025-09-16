import "server-only";

import { cookies } from "next/headers";

import { getJWTPayload } from "@workspace/shared/token";

export async function assertUserSession() {
  const cookieStore = await cookies();
  const userSessionJWT = cookieStore.get("scrum-estimation-session")?.value;
  const decodedPayload = await getJWTPayload<{ userId: string }>(
    userSessionJWT,
    process.env.SESSION_TOKEN
  );

  if (!decodedPayload.userId) throw Error("No active session found");

  return decodedPayload;
}
