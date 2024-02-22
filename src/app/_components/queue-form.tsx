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
import { type PropsWithChildren } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Dashboard.new_queue.form");
  return (
    <Form
      defaultValues={defaultValues}
      className="max-w-screen-md space-y-4"
      schema={ZQueueCreateInputSchema}
      onSubmit={(values) => save.mutate(values)}
    >
      <FormField title={t("name.title")} description={t("name.description")}>
        <Fieldset name="name">
          <Input placeholder={t("name.placeholder")} />
        </Fieldset>
      </FormField>
      <FormField
        title={t("description.title")}
        description={t("description.description")}
      >
        <Fieldset name="description">
          <Textarea rows={6} placeholder={t("description.placeholder")} />
        </Fieldset>
      </FormField>
      <div className="flex justify-end">
        <Button
          isLoading={save.isLoading}
          type="submit"
          variant="primary"
          size="lg"
        >
          {t("submit_button")}
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
