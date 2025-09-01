import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { roomJoinSocket } from "@/app/_lib/socket";

export default function useRoomJoinSocket() {
  const { roomId } = useParams();

  useEffect(() => {
    roomJoinSocket.io.opts.query = { roomId };

    roomJoinSocket.on("room:player:join", (payload) => {
      if (Number(payload)) {
        roomJoinSocket.disconnect();
        redirect(`/room/${roomId}`);
      }
    });

    roomJoinSocket.connect();

    return () => {
      roomJoinSocket.disconnect();
    };
  }, []);
}
