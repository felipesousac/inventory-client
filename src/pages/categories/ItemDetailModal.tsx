import * as Dialog from "@radix-ui/react-dialog";
import { LucideMoreHorizontal } from "lucide-react";
import { ItemCardProps } from "./ItemCard";

export function ItemDetailModal({ item }: ItemCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-full hover:text-slate-950">
        <LucideMoreHorizontal size={26} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-[dialog-overlay-show_300ms] data-[state=closed]:animate-[dialog-overlay-hide_300ms]" />

        <Dialog.Content className="bg-white data-[state=open]:animate-[dialog-content-show_200ms] data-[state=closed]:animate-[dialog-content-hide_200ms] flex flex-col fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-5/6 max-w-xl">
          <div className="bg-slate-200 w-full h-52 flex justify-center items-center">
            No image uploaded
          </div>
          <div className="px-6 py-4 space-y-2">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-xl w-fit tracking-tight">
                {item.itemName}
              </div>
              <div className="rounded-full bg-green-300 px-3 py-0.5 text-xs shrink-0">
                $ {item.price}
              </div>
            </div>
            <div className="text-gray-700 text-base">{item.description}</div>
            <p>{item.numberInStock} in stock</p>

            <div className="pt-2 flex gap-2">
              <button className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 font-semibold transition-colors hover:bg-gray-300">
                Edit
              </button>
              <button className="rounded-full px-3 py-1 text-sm text-gray-700 font-semibold hover:bg-red-500 hover:text-[white] transition-colors">
                Delete
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
