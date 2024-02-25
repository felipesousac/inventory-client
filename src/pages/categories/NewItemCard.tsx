import { LucidePlus } from "lucide-react";

export function NewItemCard() {
  return (
    <div
      className="flex items-center justify-center rounded-md border border-gray-400 py-2 px-3 
                    leading-normal shadow-lg bg-white hover:text-slate-950"
    >
      <div className="text-xl flex gap-3 items-center">
        <LucidePlus size={18} />
        Register new item
      </div>
    </div>
  );
}
