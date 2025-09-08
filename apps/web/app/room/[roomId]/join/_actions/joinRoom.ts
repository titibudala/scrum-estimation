"use server";

import { redis } from "@/app/_lib/redis";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JoinRoomSchema } from "@workspace/shared/validator";
import { getJWTPayload } from "@workspace/shared/token";

export async function joinRoom(_: any, formData: FormData) {
  const rawData = {
    roomId: formData.get("roomId") as string,
    playerName: formData.get("playerName") as string,
    playerExpertise: formData.get("playerExpertise") as string,
  };

  try {
    const validateData = JoinRoomSchema.safeParse(rawData);

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

    const adminId = await redis.json.get(
      `room:${validateData.data.roomId}:config`,
      {
        path: [".adminId"],
      }
    );

    const isAdminUser = userId === adminId;

    await redis.hSet(`room:${validateData.data.roomId}:players`, {
      [`${userId}:id`]: userId as string,
      [`${userId}:name`]: validateData.data.playerName,
      [`${userId}:expertise`]: validateData.data.playerExpertise,
      [`${userId}:active`]: 0,
      [`${userId}:verified`]: +isAdminUser,
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

  redirect(`/room/${rawData.roomId}`);
}
