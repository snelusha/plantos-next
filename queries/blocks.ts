import { useQueryClient, useMutation } from "@tanstack/react-query";

import { z } from "zod";

import { createBlock, deleteBlock, updateBlock } from "@/actions/blocks";

import {
  createBlockSchema,
  updateBlockSchema,
  deleteBlockSchema,
} from "@/schemas/blocks";

type CreateBlock = z.infer<typeof createBlockSchema>;
type UpdateBlock = z.infer<typeof updateBlockSchema>;
type DeleteBlock = z.infer<typeof deleteBlockSchema>;

export const useCreateBlock = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (block: CreateBlock) => createBlock(block),
    onSettled: () =>
      client.invalidateQueries({
        queryKey: ["sections"],
      }),
  });
};

export const useUpdateBlock = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (block: UpdateBlock) => updateBlock(block),
    onSettled: () =>
      client.invalidateQueries({
        queryKey: ["sections"],
      }),
  });
};

export const useDeleteBlock = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (block: DeleteBlock) => deleteBlock(block),
    onSettled: () =>
      client.invalidateQueries({
        queryKey: ["blocks"],
      }),
  });
};
