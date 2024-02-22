"use client";

import { Fieldset } from "~/app/_components/ui/form/fieldset";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import { Form } from "./ui/form";
import { Input } from "./ui/form/inputs";
import { ZQueueEnterInputSchema } from "~/server/api/routers/queue/queue.schema";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function QueueEnter({ queueId = "" }) {
  const router = useRouter();

  const enter = api.queue.enter.useMutation({
    onSuccess: ({ id }) => router.push(`/queue/${queueId}/${id}`),
  });

  const t = useTranslations("Queue");
  return (
    <Form
      className="space-y-2"
      schema={ZQueueEnterInputSchema}
      defaultValues={{ queueId }}
      onSubmit={(values) => {
        enter.mutate(values);
      }}
    >
      <Fieldset name="queueId">
        <Input type="hidden" />
      </Fieldset>
      <Fieldset name="email" label="Email">
        <Input type="email" required autoComplete={"on"} />
      </Fieldset>
      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={enter.isLoading}
          className="w-full md:w-auto"
          variant="primary"
        >
          {t("enter_button")}
        </Button>
      </div>

      <pre className="text-red-600">{enter.error?.message}</pre>
    </Form>
  );
}
