import * as Dialog from "@radix-ui/react-dialog";
import { NewItemCard } from "./NewItemCard";
import { useState } from "react";
import { CreateItemFormField } from "./CreateItemFormField";

interface Props {
  categoryId: string | undefined;
}

export function CreateItemForm({ categoryId }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger className="w-11/12 max-w-xl">
        <NewItemCard />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-[dialog-overlay-show_300ms] data-[state=closed]:animate-[dialog-overlay-hide_300ms]" />

        <Dialog.Content className="rounded-md overflow-hidden data-[state=open]:animate-[dialog-content-show_200ms] data-[state=closed]:animate-[dialog-content-hide_200ms] flex fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-5/6 max-w-xl">
          <div className="w-full shadow-xl">
            <div className="mx-auto flex items-center bg-[#436850] text-[#FBFADA]">
              <Dialog.Title className="text-xl p-2">New Item</Dialog.Title>
            </div>
            <div className="bg-slate-200 mx-auto max-w-6xl pt-3 px-4 text-[#12372A]/90 tracking-tight flex flex-col items-left justify-start gap-2">
              <p>
                New items can be registered in the inventory by filling out the
                form below
              </p>
              <div className="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:opacity-100 w-full" />

              <CreateItemFormField
                afterRegister={() => setIsDialogOpen(false)}
                categoryId={categoryId}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
