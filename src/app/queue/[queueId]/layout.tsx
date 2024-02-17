import { notFound } from "next/navigation";
import { Markdown } from "~/app/_components/ui/markdown";
import { api } from "~/trpc/server";

export default async function QueueLayout({
  children,
  params: { queueId },
}: {
  children: React.ReactNode;
  params: { queueId: string };
}) {
  const queue = await api.queue.get.query({ id: queueId });

  if (!queue) return notFound();

  return (
    <div className="flex-1 px-2 py-8">
      <div className="mx-auto max-w-screen-sm">
        <div className="mb-4">
          <h1 className="mb-3 text-3xl font-semibold tracking-wide">
            {queue.name}
          </h1>
          <Markdown>{queue.description}</Markdown>
          {children}
        </div>
      </div>
    </div>
  );
}
