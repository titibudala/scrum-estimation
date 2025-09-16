"use server";

import { z } from "zod";
import { redis } from "@/app/_lib/redis";
import { CreateTicketSchema } from "@workspace/shared/validator";
import { assertUserSession } from "@/app/_utils/session";

export async function createTicket(_: any, formData: FormData) {
  try {
    await assertUserSession();

    const rawData = {
      roomId: formData.get("roomId") as string,
      ticketTitle: formData.get("ticketTitle") as string,
    };

    const validatedData = CreateTicketSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Wrong values used in the form",
        errors: z.flattenError(validatedData.error),
        data: rawData,
      };
    }

    await redis.json.ARRAPPEND(
      `room:${validatedData.data.roomId}:ticket`,
      "$",
      {
        id: crypto.randomUUID(),
        title: validatedData.data.ticketTitle,
        completed: false,
        votes: {},
      }
    );

    return {
      success: true,
      message: "Ticket created",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}
