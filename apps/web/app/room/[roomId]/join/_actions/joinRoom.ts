"use server";

import { redis } from "@/app/_lib/redis";
import { z } from "zod";
import { redirect } from "next/navigation";
import {
  JoinRoomSchema,
  JoinRoomSchemaTypes,
} from "@workspace/shared/validator";
import { assertUserSession } from "@/app/_utils/session";

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

    const adminId = await redis.json.get(
      `room:${validateData.data.roomId}:config`,
      {
        path: [".adminId"],
      }
    );

    const isAdminUser = session.userId === adminId;

    await redis.hSet(`room:${validateData.data.roomId}:players`, {
      [`${session.userId}:id`]: session.userId as string,
      [`${session.userId}:name`]: validateData.data.playerName,
      [`${session.userId}:expertise`]: validateData.data.playerExpertise,
      [`${session.userId}:active`]: 0,
      [`${session.userId}:verified`]: +isAdminUser,
      [`${session.userId}:voted`]: "",
    });

    if (!isAdminUser) {
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
