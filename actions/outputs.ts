"use server";

import lodash from "lodash";

import { client } from "@/lib/requests";

import { actionClient } from "@/lib/safe-action";

import { outputSchema, setOutputSchema } from "@/schemas/outputs";

export const getOutputs = actionClient.action(async () => {
  try {
    const response = await client.get("/outputs");

    const data = response.data;

    const outputChannels = data["output channels"] || [];
    const outputDevices = data["output devices"] || [];
    const outputStates = data["output states"] || [];

    const devices = lodash.keyBy(outputDevices, "unique_id");
    const states = outputStates;

    const outputs = outputChannels.map((channel: any) => {
      const device = devices[channel.output_id] || {};
      const state = states[channel.output_id] || {};
      return {
        ...channel,
        ...device,
        state,
      };
    });

    return outputs;
  } catch (_) {
    return null;
  }
});

export const getOutput = actionClient
  .schema(outputSchema)
  .action(async ({ parsedInput: { id, channel } }) => {
    try {
      const response = await client.get(`/outputs/${id}`);

      const data = response.data;

      const device = data["output device"] || {};
      const outputStates = data["output device channel states"] || {};

      return {
        ...(device.unique_id && {
          ...device,
          state: (outputStates[channel.toString()] || "off") === "on",
        }),
      };
    } catch (_) {
      return null;
    }
  });

export const setOutput = actionClient
  .schema(setOutputSchema)
  .action(async ({ parsedInput: { id, channel, state, duration, volume } }) => {
    try {
      await client.post(`/outputs/${id}`, {
        channel: channel,
        state: state,
        duration: duration,
        volume: volume,
      });

      return true;
    } catch (e) {
      return false;
    }
  });
