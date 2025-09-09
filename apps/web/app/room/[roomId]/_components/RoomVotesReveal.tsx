"use client";

import { useActionState, startTransition } from "react";
import { revealVotes } from "../_actions/revealVotes";
import { useParams } from "next/navigation";

export default function RommVotesReveal({
  isDisabled,
}: {
  isDisabled?: boolean;
}) {
  const { roomId } = useParams();
  const [_state, action, isPending] = useActionState(revealVotes, {
    success: false,
    message: "",
  });

  return (
    <button
      onClick={() =>
        startTransition(() => action({ roomId: roomId as string }))
      }
      className="action"
      disabled={isPending || isDisabled}
    >
      REVEAL VOTES
    </button>
  );
}
