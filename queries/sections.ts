import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { createSection, getSections } from "@/actions/sections";

export const useSections = () => {
  const { data: sections, error } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => await getSections(),
  });

  return {
    sections: sections?.data || [],
    error: error,
    loading: !sections && !error,
  };
};

export const useCreateSection = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async () => createSection(),
    onSettled: () =>
      client.invalidateQueries({
        queryKey: ["sections"],
      }),
  });
};
