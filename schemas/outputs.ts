import { z } from "zod";

export const outputSchema = z.object({
  id: z.string(),
  channel: z.number(),
});

export const setOutputSchema = z.object({
  id: z.string(),
  channel: z.number(),
  state: z.boolean(),
  duration: z.number().optional(),
  volume: z.number().optional(),
});

export const outputToggleSchema = z.object({
  id: z.string(),
  channel: z.number(),
});
