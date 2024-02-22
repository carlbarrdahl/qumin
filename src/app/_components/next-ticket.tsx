"use client";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function NextTicket({ queueId = "", children = "" }) {
  const router = useRouter();
  const next = api.queue.next.useMutation({
    onSuccess: () => router.refresh(),
  });
  return (
    <Button
      isLoading={next.isLoading}
      icon={Check}
      variant="primary"
      onClick={() => next.mutate({ queueId })}
    >
      {children}
    </Button>
  );
}
