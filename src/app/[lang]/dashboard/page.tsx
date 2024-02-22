import Link from "next/link";
import { api } from "~/trpc/server";
import { PageSection } from "~/app/_components/page-section";
import { Button } from "~/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { QueueList } from "~/app/_components/queue-list";
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const queues = await api.queue.list.query();

  const t = await getTranslations("Dashboard");
  return (
    <PageSection
      title={t("title")}
      description={t("description")}
      action={
        <Button
          as={Link}
          href={`/dashboard/new`}
          icon={PlusIcon}
          variant="primary"
        >
          {t("create_queue")}
        </Button>
      }
    >
      <QueueList queues={queues} />
    </PageSection>
  );
}
