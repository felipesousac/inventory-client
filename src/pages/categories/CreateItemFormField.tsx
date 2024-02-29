import { LucideX, LucideCheck } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SpinLoader } from "@/components/SpinLoader";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createItemSchema = z.object({
  itemName: z
    .string()
    .min(3, { message: "Minimum 3 characters" })
    .max(30, { message: "Maximum 30 characters" }),
  description: z.string().max(50, { message: "Maximum 50 characters" }),
  price: z.coerce.number().gt(0, { message: "Must be more than zero" }),
  numberInStock: z.coerce
    .number()
    .nonnegative({ message: "Must not be less than zero" }),
});

type CreateItemSchema = z.infer<typeof createItemSchema> & {
  categoryId: string | undefined;
};

interface FieldProps {
  afterRegister: () => void;
  categoryId: string | undefined;
}

export function CreateItemFormField({ afterRegister, categoryId }: FieldProps) {
  const queryClient = useQueryClient();

  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState } = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({
      itemName,
      description,
      price,
      numberInStock,
    }: CreateItemSchema) => {
      setIsSaving(true);

      // Delay on form submit
      await new Promise((resolve) => setTimeout(resolve, 500));

      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios
        .post(
          "http://localhost:8080/items",
          {
            itemName,
            description,
            categoryId: categoryId,
            price,
            numberInStock,
          },
          headers
        )
        .then((response) => {
          afterRegister();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        // need to be items queryKey
        queryKey: ["get-categories"],
      });
    },
  });

  async function createItem({
    itemName,
    description,
    price,
    numberInStock,
  }: CreateItemSchema) {
    await mutateAsync({
      itemName,
      description,
      price,
      numberInStock,
      categoryId: categoryId,
    });
  }

  return (
    <form onSubmit={handleSubmit(createItem)}>
      <fieldset disabled={isSaving} className="group space-y-4">
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
          {formState.errors?.itemName?.message && (
            <p className="text-sm text-red-500">
              {formState.errors.itemName.message}
            </p>
          )}
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
          {formState.errors?.description?.message && (
            <p className="text-sm text-red-500">
              {formState.errors.description.message}
            </p>
          )}
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
          {formState.errors?.price?.message && (
            <p className="text-sm text-red-500">
              {formState.errors.price.message}
            </p>
          )}
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
          {formState.errors?.numberInStock?.message && (
            <p className="text-sm text-red-500">
              {formState.errors.numberInStock.message}
            </p>
          )}
        </div>

        <div className="flex gap-4 justify-end p-4">
          <Dialog.Close asChild>
            <button className="flex items-center tracking-tight gap-2 border border-[#436850] p-2 rounded-lg bg-white">
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
