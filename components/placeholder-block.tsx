"use client";

import * as React from "react";

import { PlusIcon } from "lucide-react";

import { useBlockStore } from "@/stores/block-store";

import { useCreateBlock } from "@/queries/blocks";

export interface PlaceholderBlockProps {
  section: string;
}

export function PlaceholderBlock({ section }: PlaceholderBlockProps) {
  const { mutateAsync: createBlock } = useCreateBlock();

  const { isEditing } = useBlockStore();

  if (!isEditing) return null;

  return (
    <div
      className="grid place-items-center size-32 rounded-lg bg-muted cursor-pointer"
      onClick={() => createBlock({ section_id: section })}
    >
      <PlusIcon className="size-4 text-muted-foreground" />
    </div>
  );
}
