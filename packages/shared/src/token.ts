import * as jose from "jose";

const alg = "HS256";
const localSecret = new TextEncoder().encode("randomDummyStringForNow");

export async function getJWTPayload(token?: string, secret = localSecret) {
  if (!token) return {};

  try {
    const { payload } = await jose.jwtVerify(token, secret);

    return payload;
  } catch {
    return {};
  }
}

export async function signJWTPayload(payload: Record<string, any>) {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .sign(localSecret);

  return jwt;
}
