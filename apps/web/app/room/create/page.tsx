import AppPageTitle from "@/app/_components/AppPageTitle";
import RoomCreateForm from "./_components/RoomCreateForm";

export default function RoomCreatePage() {
  return (
    <>
      <AppPageTitle title="Create a new estimation room" />

      <main className="app-container pb-16">
        <RoomCreateForm />
      </main>
    </>
  );
}
