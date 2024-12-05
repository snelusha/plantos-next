import { z } from "zod";

export const measurementSchema = z.object({
  device_id: z.string(),
  channel: z.number(),
  unit: z.string(),
  period: z.number(),
});
