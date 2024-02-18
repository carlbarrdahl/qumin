"use client";
import { api } from "~/trpc/react";

export function QueuePosition({ ticketId = "" }) {
  const position = api.queue.position.useQuery(
    { id: ticketId },
    { refetchInterval: 1000 },
  );

  return <div className="h-16">{position.data?.position}</div>;
}
