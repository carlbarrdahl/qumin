"use client";
import Link from "next/link";
import { ExternalLink, QrCode, UsersIcon } from "lucide-react";
import type { Queue } from "@prisma/client";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";

export function QueueList({ queues }: { queues: Queue[] }) {
  return (
    <div className="divide-y rounded-lg border">
      {queues.map((queue) => (
        <QueueItem key={queue.id} {...queue} />
      ))}
    </div>
  );
}

function QueueItem({ id, name }: Queue) {
  const tickets = api.queue.tickets.useQuery({
    queueId: id,
    status: "created",
  });
  const all = api.queue.tickets.useQuery({ queueId: id });

  return (
    <div className="flex hover:bg-gray-100">
      <Link href={`/dashboard/${id}`} className="flex-1 p-4 ">
        <h3 className="text-lg font-medium">{name}</h3>
        <div className="inline-flex items-center gap-2 rounded bg-gray-100 px-2 py-1 text-xs">
          <UsersIcon className="size-3" />
          <span className="font-semibold">{tickets.data?.length}</span>
          <span className="text-gray-500">/</span>
          <span>{all.data?.length}</span>
        </div>
      </Link>
      <div className="flex items-center gap-1 pr-4">
        <Button
          icon={ExternalLink}
          as={Link}
          href={`/queue/${id}`}
          target="_blank"
        />
        <Button
          icon={QrCode}
          as={Link}
          href={`/queue/${id}/opengraph-image`}
          target="_blank"
        />
      </div>
    </div>
  );
}
