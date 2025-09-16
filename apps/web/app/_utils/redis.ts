import { redis } from "@/app/_lib/redis";
import { RoomConfiguration } from "@workspace/shared/types";

export async function getRoomConfig(roomId: string) {
  const response = await redis.json.GET(`room:${roomId}:config`);

  return response as unknown as RoomConfiguration | null;
}

export async function assertRoomConfig(roomId: string) {
  try {
    const response = await getRoomConfig(roomId);

    if (!response) throw Error();

    return response;
  } catch {
    throw new Error(
      "The room is unavailable or something went wrong behind the scene"
    );
  }
}
