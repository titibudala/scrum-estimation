"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { redis } from "@/app/_lib/redis";
import { CreateRoomSchema } from "@workspace/shared/validator";
import { getJWTPayload } from "@workspace/shared/token";

export async function createRoom(_: any, formData: FormData) {
  const newRoomId = crypto.randomUUID();

  try {
    const rawData = {
      roomName: formData.get("roomName") as string,
      measurementType: formData.get("measurementType") as string,
      securityType: formData.get("securityType") as string,
    };

    const validateData = CreateRoomSchema.safeParse(rawData);

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

    Promise.all([
      redis.json.SET(`room:${newRoomId}:config`, "$", {
        id: newRoomId,
        adminId: userId as string,
        roomName: validateData.data.roomName,
        measurement: ["0", "1", "2", "3", "5", "8"],
        security: validateData.data.securityType,
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
