"use server";

import { cookies } from "next/headers";
import { redis } from "@/app/_lib/redis";
import { SelectTicketSchema } from "@workspace/shared/validator";
import { getJWTPayload } from "@workspace/shared/token";

export async function selectTicket(
  _: any,
  data: { ticketId: string; roomId: string }
) {
  try {
    const rawData = {
      roomId: data.roomId,
      ticketId: data.ticketId,
    };

    const validateData = SelectTicketSchema.safeParse(rawData);

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

    await redis.json.SET(
      `room:${validateData.data.roomId}:config`,
      "$.activeTicket",
      validateData.data.ticketId
    );

    return {
      success: true,
      message: "Ticket selected",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}
