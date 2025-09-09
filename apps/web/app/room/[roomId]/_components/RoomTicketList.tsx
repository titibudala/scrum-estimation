"use client";

import { useActionState, startTransition } from "react";
import { useParams } from "next/navigation";
import { selectTicket } from "../_actions/selectTicket";

export default function RoomTicketList({
  roomTickets,
  activeTicket,
}: {
  roomTickets?: Record<any, any>[];
  activeTicket?: string;
}) {
  const { roomId } = useParams();

  const [_state, action, isPending] = useActionState(selectTicket, {
    success: false,
    message: "",
  });

  return (
    <>
      {roomTickets?.map((ticket) => {
        const isTicketActive = !!activeTicket && activeTicket === ticket.id;

        return (
          <ul className="pb-2" key={ticket.id}>
            <li>
              <span className="text-gray-500">TICKET ID: </span>
              {ticket?.id}
            </li>
            <li>
              <span className="text-gray-500">TICKET TITLE: </span>
              {ticket?.ticketTitle}
            </li>
            <li>
              <span className="text-gray-500">COMPLETED: </span>
              {`${ticket?.completed}`}
            </li>
            <li>
              <span className="text-gray-500">VOTES: </span>
              {JSON.stringify(ticket?.votes)}
            </li>
            <button
              className="action"
              onClick={() =>
                startTransition(() =>
                  action({ ticketId: ticket.id, roomId: roomId as string })
                )
              }
              disabled={isPending || isTicketActive}
            >
              {isTicketActive ? "SELECTED" : "SELECT"}
            </button>
          </ul>
        );
      })}
    </>
  );
}
