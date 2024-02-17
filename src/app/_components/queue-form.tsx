"use client";

import { useRouter } from "next/navigation";

import {
  type TQueueCreateInputSchema,
  ZQueueCreateInputSchema,
} from "~/server/api/routers/queue/queue.schema";
import { Form } from "./ui/form";
import { Fieldset } from "./ui/form/fieldset";
import { Input, Textarea } from "./ui/form/inputs";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import { PropsWithChildren } from "react";

export function QueueForm({
  defaultValues,
}: {
  defaultValues?: Partial<TQueueCreateInputSchema>;
}) {
  const router = useRouter();

  const save = api.queue.save.useMutation({
    onSuccess: ({ id }) => {
      router.push(`/dashboard/${id}`);
      router.refresh();
    },
  });
  return (
    <Form
      defaultValues={defaultValues}
      className="max-w-screen-md space-y-4"
      schema={ZQueueCreateInputSchema}
      onSubmit={(values) => {
        save.mutate(values);
      }}
    >
      <FormField
        title="Namn"
        description="Fyll i ett namn på din kö. Du kan ändra detta senare"
      >
        <Fieldset name="name">
          <Input placeholder="Min Kö" />
        </Fieldset>
      </FormField>
      <FormField
        title="Beskrivning"
        description="Beskrivning för din kö. Formattera med Markdown."
      >
        <Fieldset name="description">
          <Textarea rows={6} placeholder="En digital kö" />
        </Fieldset>
      </FormField>
      <div className="flex justify-end">
        <Button
          isLoading={save.isLoading}
          type="submit"
          variant="primary"
          size="lg"
        >
          Spara
        </Button>
      </div>
    </Form>
  );
}

function FormField({
  children,
  title,
  description,
}: PropsWithChildren<{ title: string; description: string }>) {
  return (
    <div className="mb-8 gap-8 pb-8 md:flex">
      <div className="w-64">
        <label className="text-lg font-medium">{title}</label>
        <p className="pb-4 text-sm text-gray-500">{description}</p>
      </div>
      {children}
    </div>
  );
}
