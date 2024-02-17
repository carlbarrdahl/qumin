import { PageSection } from "~/app/_components/page-section";
import { QueueForm } from "~/app/_components/queue-form";

export default function CreateQueuePage() {
  return (
    <PageSection
      title="Skapa en ny kö"
      description="Skapa en ny kö för era kunder."
    >
      <QueueForm />
    </PageSection>
  );
}
