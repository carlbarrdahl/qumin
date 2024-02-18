import { PageSection } from "~/app/_components/page-section";
import { QueueForm } from "~/app/_components/queue-form";
import { type TQueueCreateInputSchema } from "~/server/api/routers/queue/queue.schema";
import { api } from "~/trpc/server";

type Props = {
  params: { queueId: string };
};
export default async function DashboardQueueSettingsPage({
  params: { queueId },
}: Props) {
  const queue = await api.queue.get.query({ id: queueId });
  return (
    <PageSection title="Redigera kö" description="Uppdatera din kö.">
      <QueueForm defaultValues={queue as TQueueCreateInputSchema} />
    </PageSection>
  );
}
