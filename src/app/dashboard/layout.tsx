import {
  HomeIcon,
  ListPlusIcon,
  PowerIcon,
  Rows3Icon,
  UserIcon,
} from "lucide-react";
import { NavLink } from "../_components/nav-link";
import { api } from "~/trpc/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <aside className="w-14 border-r border-gray-200 sm:w-48 sm:p-4">
        <nav className="space-y-1">
          <NavLink href="/dashboard" icon={<HomeIcon />}>
            Hem
          </NavLink>

          <NavLink href="/dashboard/settings" icon={<UserIcon />}>
            Mitt konto
          </NavLink>

          <NavLink href="/dashboard/new" icon={<ListPlusIcon />}>
            Ny kö
          </NavLink>

          <QueueList />
        </nav>
      </aside>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}

async function QueueList() {
  const queues = await api.queue.list.query();
  return (
    <>
      <h3 className="mb-2 px-4 pt-8 text-xs font-semibold uppercase tracking-widest text-gray-500">
        Köer
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
    </>
  );
}
