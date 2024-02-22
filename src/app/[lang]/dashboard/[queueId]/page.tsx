import { format } from "date-fns/format";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { NextTicket } from "~/app/_components/next-ticket";
import { PageSection } from "~/app/_components/page-section";
import { Table, Td, Th, Tr } from "~/app/_components/ui/table";
import { api } from "~/trpc/server";
import { cn } from "~/utils/cn";

type Props = {
  params: { queueId: string };
};
export default async function DashboardQueuePage({
  params: { queueId },
}: Props) {
  const queue = await api.queue.get.query({ id: queueId });
  if (!queue) return notFound();

  const tickets = await api.queue.tickets.query({ queueId, status: "created" });
  const done = await api.queue.tickets.query({ queueId, status: "done" });
  const t = await getTranslations("Dashboard.queue.tickets");
  return (
    <PageSection title={queue.name} description={t("description")}>
      <div className="flex justify-end">
        <NextTicket queueId={queueId}>{t("next_button")}</NextTicket>
      </div>
      <div className="w-full table-fixed rounded-lg border">
        <Table>
          <thead className="hidden sm:table-header-group">
            <Tr>
              <Th className={"w-16"}>{t("table.position")}</Th>
              <Th>{t("table.email")}</Th>
              <Th>{t("table.created")}</Th>
            </Tr>
          </thead>
          <tbody>
            {tickets.map((ticket, i) => (
              <Tr
                key={ticket.id}
                className={cn({
                  ["bg-primary-100"]: i === 0,
                })}
              >
                <Td className={"text-center"}>{i + 1}</Td>
                <Td className={"truncate"}>{ticket.email}</Td>
                <Td>{format(ticket.createdAt, "yyyy-MM-dd HH:mm")}</Td>
              </Tr>
            ))}
            <Tr>
              <Td colSpan={3}>
                <div className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500">
                  {t("table.handled_tickets")}
                </div>
              </Td>
            </Tr>
            {done.map((ticket) => (
              <Tr key={ticket.id} className="opacity-50">
                <Td></Td>
                <Td>{ticket.email}</Td>
                <Td>{format(ticket.createdAt, "yyyy-MM-dd HH:mm")}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
    </PageSection>
  );
}
