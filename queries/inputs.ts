import { useQuery } from "@tanstack/react-query";

import { getInput, getInputs } from "@/actions/inputs";

export const useInputs = () => {
  const { data: inputs, error } = useQuery({
    queryKey: ["inputs"],
    queryFn: async () => await getInputs(),
  });

  return {
    inputs: inputs?.data || [],
    error: error,
    loading: !inputs && !error,
  };
};

export const useInput = (id: string) => {
  const { data: input, error } = useQuery({
    queryKey: ["inputs", id],
    queryFn: async () => await getInput({ id }),
  });

  return {
    input: input?.data || null,
    error: error,
    loading: !input && !error,
  };
};
