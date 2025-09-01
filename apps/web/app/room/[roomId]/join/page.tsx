"use server";

import { redis } from "@/app/_lib/redis";

import RoomJoin from "./_components/RoomJoin";

export default async function RoomJoinPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  const isRoomAvailable = await redis.exists(`room:${roomId}:config`);

  if (!isRoomAvailable) {
    throw new Error("Something went wrong");
  }

  return (
    <>
      <h1 className="title">
        JOIN ROOM WITH ID
        <span className="block">{roomId}</span>
      </h1>

      <RoomJoin />
    </>
  );
}
