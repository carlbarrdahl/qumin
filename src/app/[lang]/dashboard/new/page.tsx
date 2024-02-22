import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { PageSection } from "~/app/_components/page-section";
import { QueueForm } from "~/app/_components/queue-form";

export default async function CreateQueuePage() {
  const t = await getTranslations("Dashboard.new_queue");
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <PageSection title={t("title")} description={t("description")}>
        <QueueForm />
      </PageSection>
    </NextIntlClientProvider>
  );
}
2;
