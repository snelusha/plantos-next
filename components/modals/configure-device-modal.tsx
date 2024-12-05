"use client";

import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useInput, useInputs } from "@/queries/inputs";
import { useOutput, useOutputs } from "@/queries/outputs";
import { useUpdateBlock } from "@/queries/blocks";

export interface ConfigureDeviceModalProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type DeviceType = "input" | "output";

export function ConfigureDeviceModal({
  id,
  open,
  onOpenChange,
}: ConfigureDeviceModalProps) {
  const [type, setType] = React.useState<DeviceType | undefined>(undefined);
  const [device, setDevice] = React.useState<string | undefined>(undefined);
  const [channel, setChannel] = React.useState<string | undefined>(undefined);
  const [unit, setUnit] = React.useState<string | undefined>(undefined);
  const [period, setPeriod] = React.useState<string>("");

  const { inputs, loading: isInputsLoading } = useInputs();

  const { outputs, loading: isOutputsLoading } = useOutputs();

  const { input } = useInput(device || "");

  const { output } = useOutput(device || "", parseInt(channel || "0"));

  const { mutateAsync: updateBlock } = useUpdateBlock();

  React.useEffect(() => {
    setDevice(undefined);
    setChannel(undefined);
    setUnit(undefined);
    setPeriod("");
  }, [type]);

  React.useEffect(() => {
    setChannel(undefined);
    setUnit(undefined);
    setPeriod("");
  }, [device]);

  React.useEffect(() => {
    if (type === "input") input?.period && setPeriod(input.period);
  }, [input]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure a device</DialogTitle>
          <DialogDescription>
            You can configure a device by selecting options.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Select
            value={type}
            onValueChange={(value) => setType(value as DeviceType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select device type"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="input">Input</SelectItem>
              <SelectItem value="output">Output</SelectItem>
            </SelectContent>
          </Select>
          {type === "input" ? (
            <Select
              value={device}
              onValueChange={(value) => setDevice(value)}
              disabled={type === undefined || isInputsLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select device"></SelectValue>
              </SelectTrigger>
              {!!inputs.length && (
                <SelectContent>
                  {inputs.map((device: any) => (
                    <SelectItem key={device.id} value={device.unique_id}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
            </Select>
          ) : (
            <Select
              value={device}
              onValueChange={(value) => setDevice(value)}
              disabled={type === undefined || isOutputsLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select device"></SelectValue>
              </SelectTrigger>
              {!!outputs.length && (
                <SelectContent className="max-h-[254px]">
                  {outputs.map((device: any) => (
                    <SelectItem key={device.id} value={device.unique_id}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
            </Select>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={channel}
              onValueChange={(value) => {
                setChannel(value);
                setUnit(
                  type === "input"
                    ? input?.measurements.find((m: any) => m.channel === value)
                        ?.unit
                    : output?.unit
                );
              }}
              disabled={type !== "input" || device === undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select channel"></SelectValue>
              </SelectTrigger>
              {type === "input" && input?.measurements && (
                <SelectContent>
                  {input.measurements.map((m: any) => (
                    <SelectItem key={m.channel} value={m.channel}>
                      {m.measurement}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
            </Select>
            <Select>
              <Input
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="Period"
                disabled={type !== "input"}
              />
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              if (type && device) {
                updateBlock({
                  id,
                  type,
                  device_id: device,
                  channel: parseInt(channel || "0"),
                  unit,
                  period: parseInt(period),
                });
              }
            }}
          >
            Configure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
