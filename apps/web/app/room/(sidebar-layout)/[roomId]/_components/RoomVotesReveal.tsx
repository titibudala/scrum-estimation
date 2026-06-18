"use client";

import { useActionState, startTransition } from "react";
import { revealVotes } from "../_actions/revealVotes";
import { useParams } from "next/navigation";
import { Button } from "@/app/_components/shadcn/ui/button";

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
    <Button
      onClick={() =>
        startTransition(() => action({ roomId: roomId as string }))
      }
      disabled={isPending || isDisabled}
    >
      Reveal votes
    </Button>
  );
}
