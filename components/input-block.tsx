"use client";

import * as React from "react";

import { PlusIcon } from "lucide-react";

import { useBlockStore } from "@/stores/block-store";

import { useMeasurement } from "@/queries/measurements";

export interface InputBlockProps {
  device: string;
  channel: number;
  unit: string;
  period: number;
}

export function InputBlock({ device, channel, unit, period }: InputBlockProps) {
  const { measurement } = useMeasurement(device, unit, channel, period);

  const { isEditing } = useBlockStore();

  return (
    <div className="grid place-items-center size-32 rounded-lg bg-red-100 cursor-pointer">
      {JSON.stringify(measurement, null, 2)}
    </div>
  );
}
