"use client";

import * as React from "react";

import { useMeasurement } from "@/queries/measurements";
import { useOutput, useToggleOutput } from "@/queries/outputs";

import { cn } from "@/styles/utils";
import { PowerIcon } from "lucide-react";

interface InputBlock {
  type: "input";
  device: string;
  unit: string;
  channel: number;
  period: number;
}

interface OutputBlock {
  type: "output";
  device: string;
  channel: number;
  period: number;
  duration?: number;
  volume?: number;
}

type Block = (InputBlock | OutputBlock) & { name: string };

/*
  air temp
  air hum
  vdp
  dewpoint

  air temp 
  air hum
  vdp
  dewpoint

  co2
  co2

  water temp atlas pt 1000
  water pH

  ec
  tds

  power
  
*/

const sections: Block[][] = [
  [
    {
      type: "input",
      device: "d7d80122-25b5-4f09-b697-bb63bd9f79bc",
      unit: "C",
      channel: 0,
      period: 60,

      name: "Air Temp",
    },
    {
      type: "input",
      device: "d7d80122-25b5-4f09-b697-bb63bd9f79bc",
      unit: "percent",
      channel: 1,
      period: 60,

      name: "Air Humidity",
    },
    {
      type: "input",
      device: "d7d80122-25b5-4f09-b697-bb63bd9f79bc",
      unit: "Pa",
      channel: 3,
      period: 60,

      name: "Pressure",
    },
    {
      type: "input",
      device: "d7d80122-25b5-4f09-b697-bb63bd9f79bc",
      unit: "C",
      channel: 2,
      period: 60,

      name: "Dewpoint",
    },

    {
      type: "input",
      device: "c7e4d18f-4904-49c4-aa57-a0ccd46a6572",
      unit: "C",
      channel: 0,
      period: 60,

      name: "Air Temp",
    },
    {
      type: "input",
      device: "c7e4d18f-4904-49c4-aa57-a0ccd46a6572",
      unit: "percent",
      channel: 1,
      period: 60,

      name: "Air Humidity",
    },
    {
      type: "input",
      device: "c7e4d18f-4904-49c4-aa57-a0ccd46a6572",
      unit: "Pa",
      channel: 3,
      period: 60,

      name: "Pressure",
    },
    {
      type: "input",
      device: "c7e4d18f-4904-49c4-aa57-a0ccd46a6572",
      unit: "C",
      channel: 2,
      period: 60,

      name: "Dewpoint",
    },
  ],
  [
    {
      type: "input",
      device: "a0031fbf-066d-4774-963e-5863da609b44",
      unit: "ppm",
      channel: 0,
      period: 30,

      name: "Carbon Dioxide",
    },
    {
      type: "input",
      device: "8faacd4c-ebfb-4550-93b2-7ace9056d7b6",
      unit: "ppm",
      channel: 0,
      period: 30,

      name: "Carbon Dioxide",
    },
  ],
  [
    {
      type: "input",
      device: "11d35934-5e36-409a-b548-88c878057828",
      unit: "C",
      channel: 0,
      period: 15,

      name: "Water Temp",
    },
    {
      type: "input",
      device: "4e2bb93d-713d-4f67-af1b-dd2b9a8c39ba",
      unit: "pH",
      channel: 0,
      period: 15,

      name: "Water pH",
    },
    {
      type: "input",
      device: "82f19cc2-b6dd-4ea6-9273-0edd7ffbf377",
      unit: "uS_cm",
      channel: 0,
      period: 15,

      name: "EC",
    },
    {
      type: "input",
      device: "82f19cc2-b6dd-4ea6-9273-0edd7ffbf377",
      unit: "ppm",
      channel: 1,
      period: 15,

      name: "TDS",
    },
  ],
  [
    {
      type: "output",
      device: "c62e9180-df4d-453f-bc13-246f8de23742",
      channel: 0,
      period: 30,

      name: "Power",
    },
    {
      type: "output",
      device: "0c508db9-b352-43b6-a581-e7c5a4c10b20",
      channel: 0,
      period: 30,

      name: "Lights",
    },
    {
      type: "output",
      device: "10daa648-828f-4d53-b4c6-fca5ea6a2176",
      channel: 0,
      period: 30,

      name: "Fans",
    },
    {
      type: "output",
      device: "e5524241-386a-4479-839d-1a661d3b30e1",
      channel: 0,
      period: 30,

      name: "Water Pumps",
    },
    {
      type: "output",
      device: "5de0beca-a4f7-4e17-b9f5-fa2a9a2d0cea",
      channel: 0,
      period: 30,

      name: "Seedling Drawers",
    },
    {
      type: "output",
      device: "bf3f52dd-e729-442b-8176-3c9d82295312",
      channel: 0,
      period: 30,

      name: "CO2 Release",
    },
    {
      type: "output",
      device: "5c0df036-1f6d-4e93-816f-4511e7754947",
      channel: 0,
      period: 30,

      name: "Tank Water In",
    },
  ],
  [
    {
      type: "output",
      device: "a0e27519-91ff-4881-9610-b3959fae70b6",
      channel: 0,
      period: 30,

      duration: 5,

      name: "Nutrient A",
    },
    {
      type: "output",
      device: "c9797b76-85f6-4a5d-b5ac-d65af3bcf87f",
      channel: 0,
      period: 30,

      duration: 5,

      name: "Nutrient B",
    },
    {
      type: "output",
      device: "90dddaa2-b619-4354-8206-ee764ae06c61",
      channel: 0,
      period: 30,

      duration: 5,

      name: "Nutrient B2",
    },
  ],
  [
    {
      type: "output",
      device: "1920e563-4f16-4181-8334-bc098a48da6a",
      channel: 0,
      period: 30,

      name: "PH - UP",
    },
    {
      type: "output",
      device: "27f5e445-fb41-481d-b854-0eda386749ec",
      channel: 0,
      period: 30,

      name: "PH - DOWN",
    },
  ],
];

interface InputBlockProps {
  device: string;
  unit: string;
  channel: number;
  period: number;
  name: string;
}

function InputBlock({ device, unit, channel, period, name }: InputBlockProps) {
  const { measurement, loading } = useMeasurement(
    device,
    unit,
    channel,
    period
  );

  const value = (measurement?.value || 0).toFixed(2);

  return (
    <div className="grid place-items-center size-32 rounded-lg bg-input/50">
      <div className="flex flex-col items-center">
        <h1 className="font-mono text-lg">{loading || !value ? "-" : value}</h1>
        <h2 className="font-mono text-sm">{unit}</h2>
        <p className="font-mono text-xs mt-2 text-muted-foreground text-center px-2">
          {name}
        </p>
      </div>
    </div>
  );
}

interface OutoutBlockProps {
  device: string;
  channel: number;
  duration?: number | undefined;
  volume?: number | undefined;
  name: string;
}

function OutputBlock({
  device,
  channel,
  duration,
  volume,
  name,
}: OutoutBlockProps) {
  const { output } = useOutput(device, channel);

  const { mutateAsync: mutate } = useToggleOutput(device, channel);

  const state = output?.state;

  return (
    <div
      className="grid place-items-center size-32 rounded-lg bg-input/50 cursor-pointer relative"
      onClick={() => mutate({ duration, volume })}
    >
      <div className="flex flex-col items-center">
        <span
          className={cn(
            state ? "bg-emerald-500" : "bg-red-500",
            "size-4 rounded-full absolute top-0 right-0 m-2"
          )}
        ></span>
        <PowerIcon className="size-5" />
        <p className="font-mono text-sm mt-4 text-center px-4">{name}</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-dvh grid place-items-center">
      <div className="flex flex-col gap-10 my-20">
        {sections.map((section, sIndex) => (
          <div key={`section-${sIndex}`} className="grid grid-cols-4 gap-4">
            {section.map((block, bIndex) =>
              block.type === "input" ? (
                <InputBlock key={`block-${bIndex}`} {...block} />
              ) : (
                <OutputBlock key={`block-${bIndex}`} {...block} />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
