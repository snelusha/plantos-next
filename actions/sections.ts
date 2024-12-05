"use server";

import { prisma } from "@/lib/prisma";

import { actionClient } from "@/lib/safe-action";

export const getSections = actionClient.action(async () => {
  try {
    const sections = await prisma.section.findMany({
      include: {
        blocks: true,
      },
    });
    return sections;
  } catch (_) {
    return null;
  }
});

export const createSection = actionClient.action(async () => {
  try {
    const section = await prisma.section.create({
      data: {},
    });
    return section;
  } catch (_) {
    return null;
  }
});
