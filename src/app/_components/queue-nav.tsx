import { NavLink } from "./nav-link";

export function QueueNavigation({ queueId = "" }) {
  return (
    <nav className="flex flex-wrap gap-2">
      <NavLink href={`/dashboard/${queueId}`} icon={null}>
        Biljetter
      </NavLink>

      <NavLink href={`/dashboard/${queueId}/settings`} icon={null}>
        Inställningar
      </NavLink>
    </nav>
  );
}
