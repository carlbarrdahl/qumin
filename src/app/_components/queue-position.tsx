"use client";
import { api } from "~/trpc/react";

export function QueuePosition({ ticketId = "" }) {
  const position = api.queue.position.useQuery(
    { id: ticketId },
    { refetchInterval: 1000 },
  );

  return <div>{position.data?.position}</div>;
}
