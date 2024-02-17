import { notFound } from "next/navigation";
import { tv } from "tailwind-variants";
import { QueuePosition } from "~/app/_components/queue-position";
import { createComponent } from "~/app/_components/ui";

import { api } from "~/trpc/server";

type Props = { params: { queueId: string; ticketId: string } };

export default async function TicketPage({
  params: { queueId, ticketId },
}: Props) {
  const queue = await api.queue.get.query({ id: queueId });
  const ticket = await api.queue.ticket.query({ id: ticketId });

  if (!queue || !ticket) return notFound();

  return (
    <div>
      <Stat>
        <StatLabel>Plats i kö</StatLabel>
        <div className="flex items-end justify-center gap-2">
          <span className="text-7xl font-semibold">
            <QueuePosition ticketId={ticketId} />
          </span>
        </div>
      </Stat>
    </div>
  );
}

const Stat = createComponent("div", tv({ base: "border rounded p-8 flex-1" }));
const StatLabel = createComponent(
  "div",
  tv({ base: "text-center uppercase text-sm tracking-wider" }),
);
