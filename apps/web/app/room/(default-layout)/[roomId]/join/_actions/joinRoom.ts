"use server";

import { redis } from "@/app/_lib/redis";
import { z } from "zod";
import { redirect } from "next/navigation";
import {
  JoinRoomSchema,
  JoinRoomSchemaTypes,
} from "@workspace/shared/validator";
import { assertUserSession } from "@/app/_utils/session";
import { getRoomConfig } from "@/app/_utils/redis";

export async function joinRoom(_: any, payload: JoinRoomSchemaTypes) {
  try {
    const session = await assertUserSession();
    const validateData = JoinRoomSchema.safeParse(payload);

    if (!validateData.success) {
      return {
        success: false,
        message: "Wrong values used in the form",
        errors: z.flattenError(validateData.error),
      };
    }

    const roomConfig = await getRoomConfig(validateData.data.roomId);

    const isVerified =
      session.userId === roomConfig?.adminId || roomConfig?.security === "OPEN";

    await redis.hSet(`room:${validateData.data.roomId}:players`, {
      [`${session.userId}:id`]: session.userId as string,
      [`${session.userId}:name`]: validateData.data.playerName,
      [`${session.userId}:expertise`]: validateData.data.playerExpertise,
      [`${session.userId}:active`]: 0,
      [`${session.userId}:verified`]: +isVerified,
      [`${session.userId}:voted`]: "",
    });

    if (!isVerified) {
      return {
        success: true,
        message: `All good - wait for the admin to verify you and let you in`,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }

  redirect(`/room/${payload.roomId}`);
}
