import { redirect } from "next/navigation";
import { redis } from "@/app/_lib/redis";
import { assertUserSession } from "@/app/_utils/session";
import { assertRoomConfig } from "@/app/_utils/redis";

import AppPageTitle from "@/app/_components/AppPageTitle";
import RoomSidebar from "./_components/RoomSidebar";

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ roomId: string }>;
}>) {
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

      <div className="app-container pb-16 flex">
        <div className="flex-3">{children}</div>
        <RoomSidebar></RoomSidebar>
      </div>
    </>
  );
}
