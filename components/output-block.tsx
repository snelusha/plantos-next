"use client";

import * as React from "react";

import { useBlockStore } from "@/stores/block-store";

import { useOutput, useToggleOutput } from "@/queries/outputs";

export interface OutputBlockProps {
  device: string;
  channel: number;
  unit: string;
  period: number;
}

export function OutputBlock({
  device,
  channel,
  unit,
  period,
}: OutputBlockProps) {
  const { output } = useOutput(device, channel);
  const { mutateAsync: mutate } = useToggleOutput(device, channel);

  const { isEditing } = useBlockStore();

  return (
    <div
      className="grid place-items-center size-32 rounded-lg bg-blue-100 cursor-pointer"
      onClick={() => mutate()}
    >
      {JSON.stringify(output, null, 2)}
    </div>
  );
}
