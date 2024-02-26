import { LucideX, LucideCheck } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SpinLoader } from "@/components/SpinLoader";
import { useState } from "react";

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

interface FieldProps {
  afterRegister: () => void;
}

export function CreateItemFormField({ afterRegister }: FieldProps) {
  const [isSaving, setIsSaving] = useState(false);

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
    setIsSaving(true);

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
        afterRegister();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit(createItem)}>
      <fieldset disabled={isSaving} className="group">
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
            <option defaultChecked>Select a category</option>
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
            className="group-disabled:pointer-events-none inline-flex items-center justify-center tracking-tight p-2 rounded-lg text-[#FBFADA] bg-[#436850]"
          >
            <div className="absolute">
              <SpinLoader className="h-4 w-4 group-enabled:opacity-0 border-t-[#FBFADA] border-l-[#FBFADA] border-b-[#FBFADA]" />
            </div>
            <div className="flex items-center gap-2 group-disabled:opacity-0">
              <LucideCheck className="size-4 shrink-0" />
              Register
            </div>
          </button>
        </div>
      </fieldset>
    </form>
  );
}
