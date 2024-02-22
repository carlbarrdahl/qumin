import { getTranslations } from "next-intl/server";
import { NavLink } from "./nav-link";

export async function QueueNavigation({ queueId = "" }) {
  const t = await getTranslations("Dashboard.queue.menu");
  return (
    <nav className="flex flex-wrap gap-2">
      <NavLink href={`/dashboard/${queueId}`} icon={null}>
        {t("tickets")}
      </NavLink>

      <NavLink href={`/dashboard/${queueId}/settings`} icon={null}>
        {t("settings")}
      </NavLink>
    </nav>
  );
}
