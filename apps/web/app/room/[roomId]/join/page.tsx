import RoomJoinForm from "./_components/RoomJoinForm";
import AppPageTitle from "@/app/_components/AppPageTitle";
import { assertRoomConfig } from "@/app/_utils/redis";

export default async function RoomJoinPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const roomConfig = await assertRoomConfig(roomId);

  return (
    <>
      <AppPageTitle title={`Join room with id ${roomId}`} />

      <main className="app-container pb-16">
        <RoomJoinForm roomConfig={roomConfig} />
      </main>
    </>
  );
}
