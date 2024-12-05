"use server";

import { prisma } from "@/lib/prisma";

import { actionClient } from "@/lib/safe-action";

import {
  createBlockSchema,
  deleteBlockSchema,
  updateBlockSchema,
} from "@/schemas/blocks";

export const createBlock = actionClient
  .schema(createBlockSchema)
  .action(async ({ parsedInput: { ...data } }) => {
    try {
      const block = await prisma.block.create({
        data: {
          ...data,
        },
      });
      return block;
    } catch (_) {
      return null;
    }
  });

export const updateBlock = actionClient
  .schema(updateBlockSchema)
  .action(async ({ parsedInput: { ...data } }) => {
    try {
      const block = await prisma.block.update({
        where: {
          id: data.id,
        },
        data: {
          type: data.type,
          device: data.device_id,
          channel: data.channel,
          unit: data.unit,
          period: data.period
        },
      });
      return block;
    } catch (e) {
      return null;
    }
  });

export const deleteBlock = actionClient
  .schema(deleteBlockSchema)
  .action(async ({ parsedInput: { ...data } }) => {
    try {
      const block = await prisma.block.delete({
        where: {
          id: data.id,
        },
      });
      return block;
    } catch (_) {
      return null;
    }
  });
