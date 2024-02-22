import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
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
  const messages = await getMessages();
  const t = await getTranslations("Dashboard.queue.settings");
  return (
    <NextIntlClientProvider messages={messages}>
      <PageSection title={t("title")} description={t("description")}>
        <QueueForm defaultValues={queue as TQueueCreateInputSchema} />
      </PageSection>
    </NextIntlClientProvider>
  );
}
