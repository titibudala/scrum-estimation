"use client";

import useRoomSocket from "../_hooks/useRoomSocket";
import RoomMeasurementList from "./RoomMeasurementList";
import RoomTicketCreate from "./RoomTicketCreate";
import RoomTicketList from "./RoomTicketList";
import RoomVotesReveal from "./RoomVotesReveal";

export default function RoomDashboard() {
  const {
    roomConfig,
    roomTickets,
    verifiedPlayers,
    unverifiedPlayers,
    isActiveTicketCompleted,
    verifyPlayer,
    voteTicket,
  } = useRoomSocket();

  return (
    <div className="flex">
      <div className="w-full">
        <RoomMeasurementList
          measurementList={roomConfig?.vote}
          onVote={voteTicket}
        />

        <p className="py-6 font-bold text-xl">VERIFIED PLAYERS</p>
        {verifiedPlayers.map((player) => (
          <ul className="pb-2" key={player.id}>
            <li>
              <span className="text-gray-500">PLAYER ID:</span> {player.id}
            </li>
            <li>
              <span className="text-gray-500">NAME:</span> {player.name}
            </li>
            <li>
              <span className="text-gray-500">EXPERTISE:</span>
              {player.expertise}
            </li>
            <li>
              <span className="text-gray-500">VERIFIED:</span> {player.verified}
            </li>
            <li>
              <span className="text-gray-500">VOTED:</span> {player.voted}
            </li>
            <li>
              <span className="text-gray-500">ACTIVE:</span> {player.active}
            </li>
          </ul>
        ))}

        <p className="py-6 font-bold text-xl">PLAYERS ON WAITING LIST</p>
        {unverifiedPlayers.map((player) => (
          <div key={player.id}>
            <ul className="pb-2">
              <li>
                <span className="text-gray-500">PLAYER ID:</span> {player.id}
              </li>
              <li>
                <span className="text-gray-500">NAME:</span> {player.name}
              </li>
              <li>
                <span className="text-gray-500">EXPERTISE:</span>
                {player.expertise}
              </li>
              <li>
                <span className="text-gray-500">VERIFIED:</span>
                {player.verified}
              </li>
              <li>
                <span className="text-gray-500">VOTED:</span> {player.voted}
              </li>
              <li>
                <span className="text-gray-500">ACTIVE:</span> {player.active}
              </li>
            </ul>

            <button
              onClick={() => verifyPlayer(player.id)}
              className="text-green-500 disabled:text-yellow-500"
            >
              ACCEPT PLAYER
            </button>
          </div>
        ))}
        {!unverifiedPlayers?.length && (
          <p className="text-gray-500">No waiting players</p>
        )}
      </div>

      <div className="w-full">
        <RoomVotesReveal
          isDisabled={isActiveTicketCompleted || !roomConfig?.activeTicket}
        />

        <p className="py-6 font-bold text-xl">ROOM CONFIG</p>
        <ul className="pb-2">
          <li>
            <span className="text-gray-500">ROOM ID: </span>
            {roomConfig?.id}
          </li>
          <li>
            <span className="text-gray-500">ADMIN ID: </span>
            {roomConfig?.adminId}
          </li>
          <li>
            <span className="text-gray-500">ROOM NAME: </span>
            {roomConfig?.name}
          </li>
          <li>
            <span className="text-gray-500">VOTE MECHANISM: </span>
            {roomConfig?.vote?.join(", ")}
          </li>
          <li>
            <span className="text-gray-500">SECURITY: </span>
            {roomConfig?.security}
          </li>
          <li>
            <span className="text-gray-500">ACTIVE TICKET: </span>
            {roomConfig?.activeTicket || "No active ticket"}
          </li>
        </ul>

        <p className="py-6 font-bold text-xl">TICKETS TO MEASURE</p>

        <RoomTicketCreate />

        <RoomTicketList
          activeTicket={roomConfig?.activeTicket}
          roomTickets={roomTickets}
        />
      </div>
    </div>
  );
}
