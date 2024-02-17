import { z } from "zod";

export const ZQueueCreateInputSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Namn måste vara minst 3 tecken" }),
  description: z.string().nullish(),
});

export const ZQueueEnterInputSchema = z.object({
  email: z.string().email(),
  queueId: z.string(),
});

export type TQueueCreateInputSchema = z.infer<typeof ZQueueCreateInputSchema>;
