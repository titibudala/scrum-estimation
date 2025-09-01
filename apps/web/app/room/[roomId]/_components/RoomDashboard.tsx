"use client";

import useRoomSocket from "../_hooks/useRoomSocket";

export default function RoomDashboard() {
  const { roomConfig, verifiedPlayers, unverifiedPlayers, verifyPlayer } =
    useRoomSocket();

  return (
    <div className="flex">
      <div className="w-full">
        <p className="py-6 font-bold">VERIFIED PLAYERS</p>
        {verifiedPlayers.map((player) => (
          <ul className="pb-2" key={player.id}>
            <li>
              <span className="text-gray-500">ID:</span> {player.id}
            </li>
            <li>
              <span className="text-gray-500">NAME:</span> {player.name}
            </li>
            <li>
              <span className="text-gray-500">VERIFIED:</span> {player.verified}
            </li>
            <li>
              <span className="text-gray-500">ACTIVE:</span> {player.active}
            </li>
          </ul>
        ))}

        <p className="py-6 font-bold">PLAYERS ON WAITING LIST</p>
        {unverifiedPlayers.map((player) => (
          <div key={player.id}>
            <ul className="pb-2">
              <li>
                <span className="text-gray-500">ID:</span> {player.id}
              </li>
              <li>
                <span className="text-gray-500">NAME:</span> {player.name}
              </li>
              <li>
                <span className="text-gray-500">VERIFIED:</span>{" "}
                {player.verified}
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
        <p className="py-6 font-bold">ROOM CONFIG</p>
        <ul className="pb-2">
          <li>
            <span className="text-gray-500">ROOM NAME: </span>
            {roomConfig?.roomName}
          </li>
          <li>
            <span className="text-gray-500">ADMIN ID: </span>
            {roomConfig?.adminId}
          </li>
          <li>
            <span className="text-gray-500">MEASUREMENT: </span>
            {roomConfig?.measurement}
          </li>
          <li>
            <span className="text-gray-500">SECURITY: </span>
            {roomConfig?.security}
          </li>
        </ul>

        <p className="py-6 font-bold">TICKETS TO MEASURE</p>
        <span className="text-gray-500">TBD</span>
      </div>
    </div>
  );
}
