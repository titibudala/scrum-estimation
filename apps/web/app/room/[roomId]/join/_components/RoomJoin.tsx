"use client";

import { useParams } from "next/navigation";
import { useActionState } from "react";
import { joinRoom } from "../_actions/joinRoom";
import useRoomJoinSocket from "../_hooks/useRoomJoinSocket";

export default function RoomJoin() {
  useRoomJoinSocket();
  const { roomId } = useParams();

  const [formState, formAction, isFormPending] = useActionState(joinRoom, {
    success: false,
    message: "",
  });

  return (
    <>
      <form action={formAction} className="gap-4 flex flex-col items-start">
        <input type="hidden" name="roomId" value={roomId} />

        <div>
          <label htmlFor="room-name">Your name:</label>
          <input
            type="text"
            name="playerName"
            id="player-name"
            placeholder="John Doe"
            defaultValue={formState.data?.playerName}
            required
          />
          {formState?.errors?.fieldErrors?.playerName?.[0] && (
            <p className="text-red-500">
              {formState?.errors?.fieldErrors?.playerName?.[0]}
            </p>
          )}
        </div>

        <fieldset>
          <legend>Your expertise:</legend>
          <div>
            <input
              type="radio"
              name="playerExpertise"
              id="expertise-fe-dev"
              value="FE_DEV"
              required
            />
            <label htmlFor="expertise-fe-dev" className="ml-2">
              FE Dev
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="playerExpertise"
              id="expertise-be-dev"
              value="BE_DEV"
            />
            <label htmlFor="expertise-be-dev" className="ml-2">
              BE Dev
            </label>
          </div>

          {formState?.errors?.fieldErrors?.playerExpertise?.[0] && (
            <p className="text-red-500">
              {formState?.errors?.fieldErrors?.playerExpertise?.[0]}
            </p>
          )}
        </fieldset>

        <button disabled={isFormPending} className="action">
          JOIN ROOM
        </button>

        {formState?.success && (
          <p className="text-yellow-500">{formState?.message}</p>
        )}
      </form>
    </>
  );
}
