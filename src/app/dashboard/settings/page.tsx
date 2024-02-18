import { PageSection } from "~/app/_components/page-section";
import { SignOutButton } from "~/app/_components/signout-button";

export default async function DashboardSettingsPage() {
  return (
    <PageSection title="Mitt konto" description="">
      <SignOutButton />
    </PageSection>
  );
}
