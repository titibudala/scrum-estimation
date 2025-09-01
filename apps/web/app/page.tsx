import Link from "next/link";

import AppJoinRoom from "./_components/AppJoinRoom";

export default function MainPage() {
  return (
    <>
      <h1 className="title">SCRUM ESTIMATION</h1>

      <main>
        <ul className="flex flex-col gap-8">
          <li>
            <p>Start a new room here:</p>
            <Link className="action" href="/room/create">
              CREATE ROOM
            </Link>
          </li>
          <li>
            <AppJoinRoom />
          </li>
        </ul>
      </main>
    </>
  );
}
