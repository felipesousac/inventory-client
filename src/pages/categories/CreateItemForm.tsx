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
        <Dialog.Overlay className="fixed inset-0 bg-slate-200 data-[state=open]:animate-[dialog-overlay-show_300ms] data-[state=closed]:animate-[dialog-overlay-hide_300ms]" />

        <Dialog.Content className="data-[state=open]:animate-[dialog-content-show_200ms] data-[state=closed]:animate-[dialog-content-hide_200ms] overflow-auto flex flex-col items-center justify-start fixed inset-0 w-full ">
          <div className="w-full h-16 bg-[#436850] shadow-xl ">
            <div className="mx-auto max-w-6xl flex items-center text-[#FBFADA]">
              <Dialog.Title className="text-xl p-4">New Item</Dialog.Title>
            </div>
            <Dialog.Description className="mx-auto max-w-6xl p-4 text-[#12372A]/90 tracking-tight flex flex-col items-left justify-start gap-4">
              <p>
                New items can be registered in the inventory by filling out the
                form below
              </p>
              <div className="mb-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:opacity-100 w-full" />

              <CreateItemFormField
                afterRegister={() => setIsDialogOpen(false)}
                categoryId={categoryId}
              />
            </Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
