"use client";

import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { PlaceholderBlock } from "@/components/placeholder-block";
import { EmptyBlock } from "@/components/empty-block";
import { InputBlock } from "@/components/input-block";
import { OutputBlock } from "@/components/output-block";

import { useHotkeys } from "react-hotkeys-hook";

import { useBlockStore } from "@/stores/block-store";

import { useCreateSection, useSections } from "@/queries/sections";

export default function Page() {
  const { sections, loading } = useSections();

  const { mutateAsync: createSection } = useCreateSection();

  const { isEditing, toggleEditing } = useBlockStore();

  useHotkeys("mod+shift+e", (_) => toggleEditing());
  useHotkeys("s", (_) => isEditing && createSection());

  return (
    <div className="min-h-dvh grid place-items-center">
      {loading ? (
        <LoaderCircle className="size-5 text-muted-foreground animate-spin" />
      ) : !sections.length ? (
        <Button variant="outline" onClick={() => createSection()}>
          Get started
        </Button>
      ) : (
        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <div key={section.id} className="grid grid-cols-4 gap-4">
              {section.blocks.map((block) =>
                !block.type ? (
                  <EmptyBlock id={block.id} />
                ) : block.type === "input" ? (
                  <InputBlock
                    key={block.id}
                    // @ts-ignore
                    device={block.device}
                    // @ts-ignore
                    unit={block.unit}
                    // @ts-ignore
                    channel={block.channel}
                    // @ts-ignore
                    period={block.period}
                  />
                ) : (
                  <OutputBlock key={block.id} device={block.device} />
                )
              )}
              <PlaceholderBlock section={section.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
