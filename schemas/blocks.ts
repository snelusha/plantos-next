import { z } from "zod";

export const createBlockSchema = z.object({
  section_id: z.string(),
});

export const updateBlockSchema = z.object({
  id: z.string(),
  type: z.enum(["input", "output"]),
  device_id: z.string(),
  unit: z.string().optional(),
  channel: z.number().optional(),
  period: z.number().default(15).optional(),
});

export const deleteBlockSchema = z.object({
  id: z.string(),
});
