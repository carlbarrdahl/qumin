import { QueueNavigation } from "~/app/_components/queue-nav";

export default async function DashboardQueueLayout({
  children,
  params: { queueId },
}: {
  children: React.ReactNode;
  params: { queueId: string };
}) {
  return (
    <div className="flex-1">
      <QueueNavigation queueId={queueId} />

      {children}
    </div>
  );
}
