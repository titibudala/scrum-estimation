"use server";

import { cookies } from "next/headers";
import { redis } from "@/app/_lib/redis";
import { RevealVotesSchema } from "@workspace/shared/validator";
import { getJWTPayload } from "@workspace/shared/token";

export async function revealVotes(_: any, data: { roomId: string }) {
  try {
    const rawData = {
      roomId: data.roomId,
    };

    const validateData = RevealVotesSchema.safeParse(rawData);

    if (!validateData.success) {
      return {
        success: false,
        message: "Wrong type of id",
      };
    }

    const cookieStore = await cookies();
    const userSessionJWT = cookieStore.get("scrum-estimation-session")?.value;
    const { userId } = await getJWTPayload(
      userSessionJWT,
      process.env.SESSION_TOKEN
    );

    if (!userId) throw Error("No active session found");

    const activeTicketId = await redis.json.GET(
      `room:${validateData.data.roomId}:config`,
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
      `room:${validateData.data.roomId}:ticket`,
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
