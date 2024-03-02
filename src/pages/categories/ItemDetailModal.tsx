import * as Dialog from "@radix-ui/react-dialog";
import { LucideMoreHorizontal } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

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

interface ItemMutation {
  id: string;
  itemName: string;
  description: string;
  categoryId: string;
  price: number;
  numberInStock: number;
}

export function ItemDetailModal({ item }: ItemDetailProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [showOptions, setShowOptions] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      await axios
        .delete(`http://localhost:8080/items/${id}`)
        .then((response) => {
          setIsDialogOpen(false);
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

  //const { mutateAsync: mutateUpdate } = useMutation({
  //  mutationFn: async(),
  //});

  function confirmDelete() {
    setShowOptions(!showOptions);
    setShowDeleteConfirm(!showDeleteConfirm);
  }

  function confirmUpdate() {
    setShowOptions(!showOptions);
    setShowUpdateConfirm(!showUpdateConfirm);
  }

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                    onClick={() => alert("teste")}
                    className="rounded-full px-3 py-1 text-sm text-gray-700 font-semibold hover:bg-[#436850] hover:text-[white] transition-colors"
                  >
                    Yes
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
