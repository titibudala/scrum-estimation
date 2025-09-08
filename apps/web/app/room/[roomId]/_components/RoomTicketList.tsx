"use client";

export default function RoomTicketList({
  roomTickets,
}: {
  roomTickets?: Record<any, any>[];
}) {
  return (
    <>
      {roomTickets?.map((ticket) => (
        <ul className="pb-2" key={ticket?.id}>
          <li>
            <span className="text-gray-500">TICKET ID: </span>
            {ticket?.id}
          </li>
          <li>
            <span className="text-gray-500">ADMIN ID: </span>
            {ticket?.ticketTitle}
          </li>
        </ul>
      ))}
    </>
  );
}
