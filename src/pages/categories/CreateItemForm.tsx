import * as Dialog from "@radix-ui/react-dialog";
import { LucideX, LucideCheck } from "lucide-react";

export function CreateItemForm() {
  return (
    <div className="w-full h-16 bg-[#436850] shadow-xl ">
      <div className="mx-auto max-w-6xl flex items-center justify-between text-[#FBFADA]">
        <Dialog.Title className="text-xl p-4">New Item</Dialog.Title>
        <Dialog.Close className="p-2 mr-2 rounded-full hover:bg-[#12372A] transition-colors">
          <LucideX className="size-5" />
        </Dialog.Close>
      </div>
      <Dialog.Description className="mx-auto max-w-6xl p-4 text-[#12372A]/90 tracking-tight flex flex-col items-left justify-start gap-4">
        <p>
          New items can be registered in the inventory by filling out the form
          below
        </p>
        <div className="mb-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:opacity-100 w-full" />
        <form className="space-y-2">
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="border border-[#12372A] rounded-lg px-3 py-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <input
              id="description"
              type="text"
              className="border border-[#12372A] rounded-lg px-3 py-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="unitPrice" className="block font-medium">
              Unit Price
            </label>
            <input
              id="unitPrice"
              type="text"
              className="border border-[#12372A] rounded-lg px-3 py-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium block" htmlFor="options-view-button">
              Category
            </label>
            <select
              name="categoryId"
              className="border border-[#12372A] rounded-lg px-3 py-2 w-full"
            >
              <option selected>Select a category</option>
              <option value="1">Capital Goods</option>
              <option value="2">Beauty</option>
            </select>
          </div>

          <div className="flex gap-4 justify-end p-4">
            <Dialog.Close asChild>
              <button className="flex items-center tracking-tight gap-2 border border-[#436850] p-2 rounded-lg">
                <LucideX className="size-4" />
                Cancel
              </button>
            </Dialog.Close>

            <button className="flex items-center tracking-tight gap-2 p-2 rounded-lg text-[#FBFADA] bg-[#436850]">
              <LucideCheck className="size-4" />
              Register
            </button>
          </div>
        </form>
      </Dialog.Description>
    </div>
  );
}
