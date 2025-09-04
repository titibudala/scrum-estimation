import * as jose from "jose";

type Secret = Uint8Array | CryptoKey | jose.KeyObject | jose.JWK;

export async function getJWTPayload(token?: string, secret?: string) {
  if (!token || !secret) return {};

  const sanitizedSecret = new TextEncoder().encode(secret);

  try {
    const { payload } = await jose.jwtVerify(token, sanitizedSecret);

    return payload;
  } catch {
    return {};
  }
}

export async function signJWTPayload(
  payload?: jose.JWTPayload,
  secret?: string
) {
  const sanitizedSecret = new TextEncoder().encode(secret);

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(sanitizedSecret);

  return jwt;
}
