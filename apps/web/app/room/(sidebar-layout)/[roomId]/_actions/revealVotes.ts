"use server";

import { redis } from "@/app/_lib/redis";
import { RevealVotesSchema } from "@workspace/shared/validator";
import { assertUserSession } from "@/app/_utils/session";

export async function revealVotes(_: any, payload: { roomId: string }) {
  try {
    await assertUserSession();

    const validatedData = RevealVotesSchema.safeParse(payload);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Wrong type of id",
      };
    }

    const activeTicketId = await redis.json.GET(
      `room:${validatedData.data.roomId}:config`,
      {
        path: ".activeTicket",
      }
    );

    if (!activeTicketId) {
      return {
        success: false,
        message: "No active ticket found",
      };
    }

    await redis.json.SET(
      `room:${validatedData.data.roomId}:ticket`,
      `$.[?(@.id == "${activeTicketId}")].completed`,
      true
    );

    return {
      success: true,
      message: "Votes revealed",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}
