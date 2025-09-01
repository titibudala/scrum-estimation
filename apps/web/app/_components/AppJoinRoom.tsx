"use client";

import { useRouter } from "next/navigation";

export default function AppJoinRoom() {
  const router = useRouter();

  function handleActionJoinRoom(formData: FormData) {
    const roomId = formData.get("roomId");

    router.push(`/room/${roomId}/join`);
  }

  return (
    <form action={handleActionJoinRoom}>
      <label htmlFor="room-id" className="block">
        Join an existing room here:
      </label>

      <input
        type="text"
        name="roomId"
        id="room-id"
        placeholder="Room identifier"
        required
      />

      <button className="action">JOIN ROOM</button>
    </form>
  );
}
