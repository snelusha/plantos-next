import * as React from "react";

import { PlusIcon } from "lucide-react";

import { useBlockStore } from "@/stores/block-store";
import { ConfigureDeviceModal } from "@/components/modals/configure-device-modal";

export interface EmptyBlockProps {
  id: string;
}

export function EmptyBlock({ id }: EmptyBlockProps) {
  const [isOpen, setOpen] = React.useState(false);

  const { isEditing } = useBlockStore();

  return (
    <>
      <div
        className="grid place-items-center size-32 rounded-lg bg-muted cursor-pointer"
        onClick={() => setOpen(true)}
      ></div>
      <ConfigureDeviceModal id={id} open={isOpen} onOpenChange={setOpen} />
    </>
  );
}
