"use client";

import { useActionState } from "react";
import { createRoom } from "./_actions/createRoom";

export default function RoomCreatePage() {
  const [formState, formAction, isFormPending] = useActionState(createRoom, {
    success: false,
    message: "",
  });

  return (
    <>
      <h1 className="title">CREATE A NEW ROOM FOR ESTIMATION</h1>

      <form action={formAction} className="gap-4 flex flex-col items-start">
        <div>
          <label htmlFor="room-name">Room title:</label>
          <input
            type="text"
            name="roomName"
            id="room-name"
            placeholder="My new room"
            defaultValue={formState.data?.roomName}
            required
          />
          {formState?.errors?.fieldErrors?.roomName?.[0] && (
            <p className="text-red-500">
              {formState?.errors?.fieldErrors?.roomName?.[0]}
            </p>
          )}
        </div>

        <fieldset>
          <legend>Measurement type:</legend>
          <div>
            <input
              type="radio"
              id="measurement-fibonacci"
              name="measurementType"
              value="FIBONACCI"
              required
            />
            <label htmlFor="measurement-fibonacci" className="ml-2">
              Fibonacci: 0, 1, 2, 3, 5, 8
            </label>
          </div>

          {formState?.errors?.fieldErrors?.measurementType?.[0] && (
            <p className="text-red-500">
              {formState?.errors?.fieldErrors?.measurementType?.[0]}{" "}
            </p>
          )}
        </fieldset>

        <fieldset>
          <legend>Security type:</legend>
          <div>
            <input
              type="radio"
              id="security-waiting-room"
              name="securityType"
              value="WAITING_ROOM"
              required
            />
            <label htmlFor="security-waiting-room" className="ml-2">
              Put the players on a waiting list and manually accept them in
            </label>
          </div>

          {formState?.errors?.fieldErrors?.securityType?.[0] && (
            <p className="text-red-500">
              {formState?.errors?.fieldErrors?.securityType?.[0]}{" "}
            </p>
          )}
        </fieldset>

        <button disabled={isFormPending} className="action">
          CREATE
        </button>
      </form>
    </>
  );
}
