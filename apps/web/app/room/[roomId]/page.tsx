"use server";

import { redirect } from "next/navigation";
import { redis } from "@/app/_lib/redis";
import { assertUserSession } from "@/app/_utils/session";
import { assertRoomConfig } from "@/app/_utils/redis";

import RoomDashboard from "./_components/RoomDashboard";
import AppPageTitle from "@/app/_components/AppPageTitle";

export default async function RoomMainPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const session = await assertUserSession();
  const roomConfig = await assertRoomConfig(roomId);

  const isPlayerVerified = await redis.hExists(
    `room:${roomId}:players`,
    `${session.userId}:verified`
  );

  if (!Number(isPlayerVerified)) {
    return redirect(`/room/${roomId}/join`);
  }

  return (
    <>
      <AppPageTitle title={roomConfig?.name || ""} />

      <main className="app-container pb-16">
        <RoomDashboard />
      </main>
    </>
  );
}
