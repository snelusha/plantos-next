import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getOutput, getOutputs, setOutput } from "@/actions/outputs";

export const useOutputs = () => {
  const { data: outputs, error } = useQuery({
    queryKey: ["outputs"],
    queryFn: async () => await getOutputs(),
  });

  return {
    outputs: outputs?.data || [],
    error: error,
    loading: !outputs && !error,
  };
};

export const useOutput = (id: string, channel: number, period: number = 30) => {
  const { data: output, error } = useQuery({
    queryKey: ["outputs", { id, channel }],
    queryFn: async () => await getOutput({ id, channel }),
    refetchInterval: period * 1000,
  });

  return {
    output: output?.data || null,
    error: error,
    loading: !output && !error,
  };
};

export const useToggleOutput = (id: string, channel: number) => {
  const client = useQueryClient();

  const { output } = useOutput(id, channel);

  return useMutation({
    mutationFn: async ({
      duration,
      volume,
    }: {
      duration?: number;
      volume?: number;
    }) =>
      await setOutput({
        id,
        channel,
        duration,
        volume,
        state: !output.state,
      }),
    onSettled: () =>
      client.invalidateQueries({
        queryKey: ["outputs", { id, channel }],
      }),
  });
};
