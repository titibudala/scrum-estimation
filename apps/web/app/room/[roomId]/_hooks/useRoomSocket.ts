import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { roomSocket } from "@/app/_lib/socket";

export default function userRoomSocket() {
  const { roomId } = useParams();
  const [roomConfig, setRoomConfig] = useState<Record<any, any>>();
  const [verifiedPlayers, setVerifiedPlayers] = useState<Record<any, any>[]>(
    []
  );
  const [unverifiedPlayers, setUnverifiedPlayers] = useState<
    Record<any, any>[]
  >([]);

  function verifyPlayer(playerId: string) {
    roomSocket.emit("room:player:verify", playerId);
  }

  useEffect(() => {
    roomSocket.io.opts.query = { roomId };

    roomSocket.on("room:player", (payload) => {
      const { verifiedPlayers, unverifiedPlayers } =
        splitVerifiedPlayers(payload);

      setVerifiedPlayers(verifiedPlayers);
      setUnverifiedPlayers(unverifiedPlayers);
    });

    roomSocket.on("room:config", (payload) => {
      setRoomConfig(payload);
    });

    roomSocket.connect();

    return () => {
      roomSocket.disconnect();
    };
  }, []);

  return { roomConfig, verifiedPlayers, unverifiedPlayers, verifyPlayer };
}

function splitVerifiedPlayers(players: Record<any, any> = {}) {
  const verifiedPlayers: Record<any, any>[] = [];
  const unverifiedPlayers: Record<any, any>[] = [];

  for (const player in players) {
    const playerType = players[player].verified
      ? verifiedPlayers
      : unverifiedPlayers;

    playerType.push(players[player]);
  }

  return { verifiedPlayers, unverifiedPlayers };
}
