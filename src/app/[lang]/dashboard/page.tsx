import Link from "next/link";
import { api } from "~/trpc/server";
import { PageSection } from "~/app/_components/page-section";
import { Button } from "~/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { QueueList } from "~/app/_components/queue-list";

export default async function DashboardPage() {
  const queues = await api.queue.list.query();

  return (
    <PageSection
      title="Alla köer"
      description="Här visas alla köer ni skapat."
      action={
        <Button
          as={Link}
          href={`/dashboard/new`}
          icon={PlusIcon}
          variant="primary"
        >
          Skapa kö
        </Button>
      }
    >
      <QueueList queues={queues} />
    </PageSection>
  );
}
