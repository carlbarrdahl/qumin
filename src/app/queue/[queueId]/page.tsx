import { notFound } from "next/navigation";

import { QueueEnter } from "~/app/_components/queue-enter";
import { api } from "~/trpc/server";

type Props = { params: { queueId: string } };
export default async function QueuePage({ params: { queueId } }: Props) {
  const queue = await api.queue.get.query({ id: queueId });

  if (!queue) return notFound();

  return (
    <div className="mx-auto max-w-96">
      <QueueEnter queueId={queueId} />
    </div>
  );
}
