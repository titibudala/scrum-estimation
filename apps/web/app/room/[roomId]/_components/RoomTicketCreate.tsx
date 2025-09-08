"use client";

import { useActionState } from "react";
import { createTicket } from "../_actions/createTicket";
import { useParams } from "next/navigation";

export default function RoomTicketCreate() {
  const { roomId } = useParams();

  const [formState, formAction, isFormPending] = useActionState(createTicket, {
    success: false,
    message: "",
  });

  return (
    <>
      <form action={formAction} className="flex justify-start items-end pb-6">
        <input type="hidden" name="roomId" value={roomId} />

        <div>
          <label htmlFor="ticket-title" className="hidden">Ticket title:</label>
          <input
            type="text"
            name="ticketTitle"
            id="ticket-title"
            placeholder="My new ticket"
            defaultValue={formState.data?.ticketTitle}
            required
          />
          {formState?.errors?.fieldErrors?.ticketTitle?.[0] && (
            <p className="text-red-500">
              {formState?.errors?.fieldErrors?.ticketTitle?.[0]}
            </p>
          )}
        </div>

        <button disabled={isFormPending} className="action">
          ADD TICKET
        </button>
      </form>
    </>
  );
}
