import * as Dialog from "@radix-ui/react-dialog";
import { LucideMoreHorizontal } from "lucide-react";
import { useState } from "react";
import { ItemDetailModalFormField } from "./ItemDetailModalFormField";

export interface ItemDetailProps {
  item: {
    id: string;
    itemName: string;
    description: string;
    categoryId: string;
    price: number;
    numberInStock: number;
  };
}

export function ItemDetailModal({ item }: ItemDetailProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger className="rounded-full hover:text-slate-950">
        <LucideMoreHorizontal size={26} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-[dialog-overlay-show_300ms] data-[state=closed]:animate-[dialog-overlay-hide_300ms]" />

        <Dialog.Content className="bg-white data-[state=open]:animate-[dialog-content-show_200ms] data-[state=closed]:animate-[dialog-content-hide_200ms] flex flex-col fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-5/6 max-w-lg">
          <div className="bg-slate-200 w-full h-52 flex justify-center items-center">
            No image uploaded
          </div>
          <ItemDetailModalFormField
            afterRegister={() => setIsDialogOpen(false)}
            item={item}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
