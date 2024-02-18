import { z } from "zod";
import { TRPCError } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  ZQueueCreateInputSchema,
  ZQueueEnterInputSchema,
} from "./queue/queue.schema";

async function verifyOwnsQueue(
  { queueId = "", userId = "" },
  db: PrismaClient,
) {
  if (
    !(await db.queue.findFirst({
      where: { id: queueId, userId },
    }))
  ) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Must be owner of queue to list tickets",
    });
  }
}
export const queueRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      return ctx.db.queue.findFirst({ where: { id } });
    }),

  ticket: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      return ctx.db.ticket.findFirst({ where: { id } });
    }),

  position: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const ticket = await ctx.db.ticket.findFirst({ where: { id } });
      if (!ticket) {
        return null;
      }
      const count = await ctx.db.ticket.findMany({
        where: { queueId: ticket?.queueId, status: { not: "done" } },
        orderBy: { createdAt: "desc" },
      });

      return {
        position: count.length,
      };
    }),

  tickets: protectedProcedure
    .input(
      z.object({
        queueId: z.string(),
        status: z.enum(["created", "done"]).optional(),
      }),
    )
    .query(async ({ ctx, input: { queueId, status } }) => {
      await verifyOwnsQueue({ queueId, userId: ctx.user.id }, ctx.db);

      const tickets = await ctx.db.ticket.findMany({
        where: { queueId, status },
        orderBy: { createdAt: "desc" },
      });

      return tickets;
    }),

  next: protectedProcedure
    .input(z.object({ queueId: z.string() }))
    .mutation(async ({ ctx, input: { queueId } }) => {
      await verifyOwnsQueue({ queueId, userId: ctx.user.id }, ctx.db);

      const [next] = await ctx.db.ticket.findMany({
        where: { queueId, status: { not: "done" } },
        orderBy: { createdAt: "asc" },
        take: 1,
      });
      if (!next) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Next ticket not found",
        });
      }

      return ctx.db.ticket.update({
        where: { id: next.id },
        data: {
          status: "done",
          handledAt: new Date(),
        },
      });
    }),

  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.queue.findMany({
      where: { userId: ctx.user.id },
      include: { tickets: true },
    });
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input: { id } }) => {
      return ctx.db.queue.delete({ where: { id, userId: ctx.user.id } });
    }),

  enter: publicProcedure
    .input(ZQueueEnterInputSchema)
    .mutation(async ({ ctx, input: { email, queueId } }) => {
      const ticketExists = await ctx.db.ticket.findFirst({
        where: { email, queueId },
      });
      if (ticketExists) {
        return ticketExists;
      }
      return ctx.db.ticket.create({
        data: { email, queue: { connect: { id: queueId } } },
      });
    }),

  save: protectedProcedure
    .input(ZQueueCreateInputSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      return id
        ? ctx.db.queue.update({ where: { id, userId: ctx.user.id }, data })
        : ctx.db.queue.create({ data: { ...data, userId: ctx.user.id } });
    }),
});
