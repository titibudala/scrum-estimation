"use client";

import { useActionState, startTransition } from "react";
import { useParams } from "next/navigation";
import { selectTicket } from "../_actions/selectTicket";
import { Button } from "@/app/_components/shadcn/ui/button";

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
              {ticket?.title}
            </li>
            <li>
              <span className="text-gray-500">COMPLETED: </span>
              {`${ticket?.completed}`}
            </li>
            <li>
              <span className="text-gray-500">VOTES: </span>
              {JSON.stringify(ticket?.votes) || "No votes available"}
            </li>
            <Button
              className="mt-1"
              onClick={() =>
                startTransition(() =>
                  action({ ticketId: ticket.id, roomId: roomId as string })
                )
              }
              disabled={isPending || isTicketActive}
            >
              {isTicketActive ? "Selected" : "Select"}
            </Button>
          </ul>
        );
      })}
    </>
  );
}
