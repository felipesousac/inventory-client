import * as Dialog from "@radix-ui/react-dialog";
import { LucideX, LucideCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const createItemSchema = z.object({
  itemName: z
    .string()
    .min(3, { message: "Minimum 3 characters" })
    .max(30, { message: "Maximum 30 characters" }),
  description: z.string().max(50, { message: "Maximum 50 characters" }),
  categoryId: z.coerce.number(),
  price: z.coerce.number().gt(0, { message: "Must be more than zero" }),
  numberInStock: z.coerce
    .number()
    .nonnegative({ message: "Must not be less than zero" }),
});

type CreateItemSchema = z.infer<typeof createItemSchema>;

export function CreateItemForm() {
  const { register, handleSubmit } = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchema),
  });

  async function createItem({
    itemName,
    description,
    categoryId,
    price,
    numberInStock,
  }: CreateItemSchema) {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(
        "http://localhost:8080/items",
        { itemName, description, categoryId, price, numberInStock },
        headers
      )
      .then((response) => {
        console.log("It worked");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="w-full h-16 bg-[#436850] shadow-xl ">
      <div className="mx-auto max-w-6xl flex items-center text-[#FBFADA]">
        <Dialog.Title className="text-xl p-4">New Item</Dialog.Title>
      </div>
      <Dialog.Description className="mx-auto max-w-6xl p-4 text-[#12372A]/90 tracking-tight flex flex-col items-left justify-start gap-4">
        <p>
          New items can be registered in the inventory by filling out the form
          below
        </p>
        <div className="mb-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:opacity-100 w-full" />
        <form className="space-y-2" onSubmit={handleSubmit(createItem)}>
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              {...register("itemName")}
              placeholder="Name"
              id="itemName"
              type="text"
              className="border border-[#12372A] rounded-lg px-3 py-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <input
              {...register("description")}
              placeholder="Description"
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
              {...register("price")}
              placeholder="Unit Price"
              id="unitPrice"
              type="number"
              className="border border-[#12372A] rounded-lg px-3 py-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="numberInStock" className="block font-medium">
              Number in Stock
            </label>
            <input
              {...register("numberInStock")}
              placeholder="Number in Stock"
              id="numberInStock"
              type="number"
              className="border border-[#12372A] rounded-lg px-3 py-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium block" htmlFor="options-view-button">
              Category
            </label>
            <select
              className="border border-[#12372A] rounded-lg px-3 py-2 w-full"
              {...register("categoryId")}
            >
              <option selected>Select a category</option>
              <option value={1}>Capital Goods</option>
              <option value={2}>Beauty</option>
            </select>
          </div>

          <div className="flex gap-4 justify-end p-4">
            <Dialog.Close asChild>
              <button className="flex items-center tracking-tight gap-2 border border-[#436850] p-2 rounded-lg">
                <LucideX className="size-4" />
                Cancel
              </button>
            </Dialog.Close>

            <button
              type="submit"
              className="flex items-center tracking-tight gap-2 p-2 rounded-lg text-[#FBFADA] bg-[#436850]"
            >
              <LucideCheck className="size-4" />
              Register
            </button>
          </div>
        </form>
      </Dialog.Description>
    </div>
  );
}
