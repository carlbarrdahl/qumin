import { currentUser } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import { PageSection } from "~/app/_components/page-section";
import { SignOutButton } from "~/app/_components/signout-button";

export default async function DashboardSettingsPage() {
  const user = await currentUser();
  const t = await getTranslations("Dashboard.settings");
  return (
    <PageSection title={t("title")} description={t("description")}>
      <div>
        {t("signed_in_as")}: {user?.firstName}
      </div>
      <SignOutButton>{t("sign_out")}</SignOutButton>
    </PageSection>
  );
}
