"use server";

import { redis } from "@/app/_lib/redis";
import { SelectTicketSchema } from "@workspace/shared/validator";
import { assertUserSession } from "@/app/_utils/session";

export async function selectTicket(
  _: any,
  payload: { ticketId: string; roomId: string }
) {
  try {
    await assertUserSession();

    const validateData = SelectTicketSchema.safeParse(payload);

    if (!validateData.success) {
      return {
        success: false,
        message: "Wrong type of id",
      };
    }

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
