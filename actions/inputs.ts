"use server";

import { client } from "@/lib/requests";

import { actionClient } from "@/lib/safe-action";

import { inputSchema } from "@/schemas/inputs";

export const getInputs = actionClient.action(async () => {
  try {
    const response = await client.get("/inputs");
    const data = response.data;

    const inputs = data["input settings"] || [];
    return inputs;
  } catch (_) {
    return null;
  }
});

export const getInput = actionClient
  .schema(inputSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const response = await client.get(`/inputs/${id}`);
      const data = response.data;

      const input = data["input settings"] || {};
      const measurements = (data["device measurements"] || []).map(
        (m: any) => ({
          channel: m.channel,
          unit: m.unit,
          measurement: m.measurement,
        })
      );

      return {
        ...input,
        measurements,
      };
    } catch (_) {
      return null;
    }
  });
