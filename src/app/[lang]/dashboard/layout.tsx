import { HomeIcon, ListPlusIcon, Rows3Icon, UserIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { NavLink } from "~/app/_components/nav-link";
import { api } from "~/trpc/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queues = await api.queue.list.query();
  const t = await getTranslations("Dashboard.sidebar");
  return (
    <div className="flex flex-1">
      <aside className="fixed h-full w-16 border-r border-gray-100 bg-white p-1 sm:w-48 sm:p-4">
        <nav className="space-y-1">
          <NavLink href="/dashboard" icon={<HomeIcon />}>
            {t("home")}
          </NavLink>

          <NavLink href="/dashboard/settings" icon={<UserIcon />}>
            {t("account")}
          </NavLink>

          <NavLink href="/dashboard/new" icon={<ListPlusIcon />}>
            {t("new_queue")}
          </NavLink>

          <h3 className="mb-2 pt-8 text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
            {t("queues")}
          </h3>

          <nav className="space-y-1">
            {queues.map((queue) => (
              <NavLink
                key={queue.id}
                href={`/dashboard/${queue.id}`}
                icon={<Rows3Icon />}
              >
                {queue.name}
              </NavLink>
            ))}
          </nav>
        </nav>
      </aside>
      <div className="flex-1 pl-16 sm:pl-48">
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}
