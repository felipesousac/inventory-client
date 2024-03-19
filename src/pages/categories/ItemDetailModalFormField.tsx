import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SpinLoader } from "@/components/SpinLoader";
import http from "@/http";

interface ItemDetailProps {
  item: {
    id: string;
    itemName: string;
    description: string;
    categoryId: string;
    price: number;
    numberInStock: number;
  };
  afterRegister: () => void;
}

interface ItemMutation {
  id: string;
  itemName: string;
  description: string;
  categoryId: string;
  price: number;
  numberInStock: number;
}

const editItemSchema = z.object({
  itemName: z
    .string()
    .min(3, { message: "Minimum 3 characters" })
    .max(30, { message: "Maximum 30 characters" }),
  description: z
    .string()
    .min(5, { message: "Minimum 5 characters" })
    .max(50, { message: "Maximum 50 characters" }),
  price: z.coerce.number().gt(0, { message: "Must be more than zero" }),
  numberInStock: z.coerce
    .number()
    .nonnegative({ message: "Must not be less than zero" }),
});

type EditItemSchema = z.infer<typeof editItemSchema>;

export function ItemDetailModalFormField({
  afterRegister,
  item,
}: ItemDetailProps) {
  const [showOptions, setShowOptions] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

  const queryClient = useQueryClient();

  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState } = useForm<EditItemSchema>({
    resolver: zodResolver(editItemSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      await http
        .delete(`/items/${id}`)
        .then(() => {
          afterRegister();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-items"],
      });
    },
  });

  async function deleteItem({ id }: ItemMutation) {
    await mutateAsync(id);
  }

  const { mutateAsync: mutateUpdate } = useMutation({
    mutationFn: async ({
      itemName,
      description,
      price,
      numberInStock,
    }: EditItemSchema) => {
      setIsSaving(true);

      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await http
        .put(
          `/items/${item.id}`,
          {
            itemName,
            description,
            price,
            numberInStock,
          },
          headers
        )
        .then(() => {
          setIsSaving(false);
          confirmUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-items"],
      });
    },
  });

  async function updateItem({
    itemName,
    description,
    price,
    numberInStock,
  }: EditItemSchema) {
    await mutateUpdate({
      itemName,
      description,
      price,
      numberInStock,
    });
  }

  function confirmDelete() {
    setShowOptions(!showOptions);
    setShowDeleteConfirm(!showDeleteConfirm);
  }

  function confirmUpdate() {
    setShowOptions(!showOptions);
    setShowUpdateConfirm(!showUpdateConfirm);
  }

  return (
    <form onSubmit={handleSubmit(updateItem)}>
      <fieldset disabled={isSaving} className="group ">
        <div className="px-6 py-4 space-y-2">
          {showUpdateConfirm ? (
            <div className="space-y-2">
              <div>
                <div className="flex justify-between">
                  <label htmlFor="name" className="block font-medium">
                    Name
                  </label>
                  {formState.errors?.itemName?.message && (
                    <p className="text-sm text-red-500">
                      * {formState.errors.itemName.message}
                    </p>
                  )}
                </div>

                <input
                  {...register("itemName", { value: item.itemName })}
                  placeholder="Name"
                  id="name"
                  type="text"
                  className="text-gray-700 text-base border border-gray-700 rounded-md p-1 w-full"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label htmlFor="description" className="block font-medium">
                    Description
                  </label>
                  {formState.errors?.description?.message && (
                    <p className="text-sm text-red-500">
                      * {formState.errors.description.message}
                    </p>
                  )}
                </div>

                <input
                  {...register("description", {
                    value: item.description,
                  })}
                  placeholder="Description"
                  id="description"
                  type="text"
                  className="text-gray-700 text-base border border-gray-700 rounded-md p-1 w-full"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label htmlFor="numberInStock" className="block font-medium">
                    Number in Stock
                  </label>
                  {formState.errors?.numberInStock?.message && (
                    <p className="text-sm text-red-500">
                      * {formState.errors.numberInStock.message}
                    </p>
                  )}
                </div>
                <input
                  {...register("numberInStock", {
                    value: item.numberInStock,
                  })}
                  placeholder="Number in Stock"
                  id="numberInStock"
                  type="number"
                  className="text-gray-700 text-base border border-gray-700 rounded-md p-1 w-full"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="unitPrice" className="block font-medium">
                    Price of unity
                  </label>
                  {formState.errors?.price?.message && (
                    <p className="text-sm text-red-500">
                      * {formState.errors.price.message}
                    </p>
                  )}
                </div>
                <input
                  {...register("price", { value: item.price })}
                  placeholder="Unit Price"
                  id="unitPrice"
                  type="number"
                  className="text-gray-700 text-base border border-gray-700 rounded-md p-1 w-full"
                />
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}

          <div className="pt-2 flex gap-2">
            {showOptions && (
              <>
                <button
                  onClick={confirmUpdate}
                  className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 font-semibold transition-colors hover:bg-gray-300"
                >
                  Edit
                </button>
                <button
                  onClick={confirmDelete}
                  className="rounded-full px-3 py-1 text-sm text-gray-700 font-semibold hover:bg-red-500 hover:text-[white] transition-colors"
                >
                  Delete
                </button>
              </>
            )}

            {showUpdateConfirm && (
              <>
                <div className="text-sm py-1 font-semibold text-gray-700">
                  Confirm changes?
                </div>
                <button
                  type="submit"
                  className="rounded-full px-3 py-1 text-sm text-gray-700 font-semibold hover:bg-[#436850] hover:text-[white] transition-colors group-disabled:pointer-events-none inline-flex items-center justify-center"
                >
                  <div className="group-disabled:opacity-0">Yes</div>
                  <div className="absolute">
                    <SpinLoader className="h-4 w-4 group-enabled:opacity-0 group-enabled:[#436850] border-t-[#FBFADA] border-l-[#FBFADA] border-b-[#FBFADA]" />
                  </div>
                </button>
                <button
                  onClick={confirmUpdate}
                  className="rounded-full px-3 py-1 text-sm text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                >
                  No
                </button>
              </>
            )}

            {showDeleteConfirm && (
              <>
                <div className="text-sm py-1 font-semibold text-gray-700">
                  Confirm delete?
                </div>
                <button
                  onClick={() => deleteItem(item)}
                  className="rounded-full px-3 py-1 text-sm text-gray-700 font-semibold hover:bg-red-500 hover:text-[white] transition-colors"
                >
                  Yes
                </button>
                <button
                  onClick={confirmDelete}
                  className="rounded-full px-3 py-1 text-sm text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                >
                  No
                </button>
              </>
            )}
          </div>
        </div>
      </fieldset>
    </form>
  );
}
