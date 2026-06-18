"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { redis } from "@/app/_lib/redis";
import {
  CreateRoomSchema,
  CreateRoomSchemaTypes,
} from "@workspace/shared/validator";
import { assertUserSession } from "@/app/_utils/session";

export async function createRoom(_: any, data: CreateRoomSchemaTypes) {
  const newRoomId = crypto.randomUUID();

  try {
    const session = await assertUserSession();
    const validatedPayload = CreateRoomSchema.safeParse(data);

    if (!validatedPayload.success) {
      return {
        success: false,
        message: "Wrong values used in the form",
        errors: z.flattenError(validatedPayload.error),
      };
    }

    Promise.all([
      redis.json.SET(`room:${newRoomId}:config`, "$", {
        id: newRoomId,
        name: validatedPayload.data.roomName,
        adminId: session.userId as string,
        security: validatedPayload.data.roomSecurity,
        vote: validatedPayload.data.roomVote,
        expertise: validatedPayload.data.roomExpertise,
        activeTicket: "",
      }),
      redis.json.SET(`room:${newRoomId}:ticket`, "$", []),
    ]);
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }

  redirect(`/room/${newRoomId}/join`);
}
