import { currentUser } from "@clerk/nextjs";
import { PageSection } from "~/app/_components/page-section";
import { SignOutButton } from "~/app/_components/signout-button";

export default async function DashboardSettingsPage() {
  const user = await currentUser();
  return (
    <PageSection title="Mitt konto" description="">
      <div>Inloggad som: {user?.firstName}</div>
      <SignOutButton />
    </PageSection>
  );
}
