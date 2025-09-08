"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { redis } from "@/app/_lib/redis";
import { CreateTicketSchema } from "@workspace/shared/validator";
import { getJWTPayload } from "@workspace/shared/token";

export async function createTicket(_: any, formData: FormData) {
  try {
    const rawData = {
      roomId: formData.get("roomId") as string,
      ticketTitle: formData.get("ticketTitle") as string,
    };

    const validateData = CreateTicketSchema.safeParse(rawData);

    if (!validateData.success) {
      return {
        success: false,
        message: "Wrong values used in the form",
        errors: z.flattenError(validateData.error),
        data: rawData,
      };
    }

    const cookieStore = await cookies();
    const userSessionJWT = cookieStore.get("scrum-estimation-session")?.value;
    const { userId } = await getJWTPayload(
      userSessionJWT,
      process.env.SESSION_TOKEN
    );

    if (!userId) throw Error("No active session found");

    await redis.json.ARRAPPEND(`room:${validateData.data.roomId}:ticket`, "$", {
      id: crypto.randomUUID(),
      ticketTitle: validateData.data.ticketTitle,
    });

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
