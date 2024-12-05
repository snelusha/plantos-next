"use server";

import { client } from "@/lib/requests";

import { actionClient } from "@/lib/safe-action";

import { measurementSchema } from "@/schemas/measurements";

export const getMeasurements = actionClient
  .schema(measurementSchema)
  .action(
    async ({ parsedInput: { device_id, channel, unit, period = 60 } }) => {
      try {
        const response = await client.get(
          `/measurements/last/${device_id}/${unit}/${channel}/${period}`
        );
        const data = response.data;
        return data;
      } catch (_) {
        return null;
      }
    }
  );
