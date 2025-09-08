"use server";

import { redirect } from "next/navigation";
import { redis } from "@/app/_lib/redis";
import { cookies } from "next/headers";
import { getJWTPayload } from "@workspace/shared/token";

import RoomDashboard from "./_components/RoomDashboard";

export default async function RoomMainPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const parsedCookies = await cookies();

  const { userId } = await getJWTPayload(
    parsedCookies.get("scrum-estimation-session")?.value,
    process.env.SESSION_TOKEN
  );

  const isRoomAvailable = await redis.exists(`room:${roomId}:config`);

  if (!isRoomAvailable || !userId) {
    throw new Error("The room is unavailable");
  }

  const isPlayerAvailable = await redis.hExists(
    `room:${roomId}:players`,
    `${userId}:name`
  );

  if (!isPlayerAvailable) {
    return redirect(`/room/${roomId}/join`);
  }

  return (
    <>
      <h1 className="title">MAIN ROOM PAGE</h1>

      <RoomDashboard />
    </>
  );
}
