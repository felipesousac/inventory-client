import { LucideMoreHorizontal } from "lucide-react";

interface ItemCardProps {
  item: {
    id: string;
    itemName: string;
    description: string;
    categoriyId: string;
    categoryName: string;
    price: number;
    numberInStock: number;
  };
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="w-80 flex items-center justify-between rounded-md border border-gray-400 py-2 px-3 leading-normal shadow-lg bg-white">
      <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-md bg-slate-300">
        <div>Img</div>
      </div>
      <div className="w-36 max-w-36">
        <p className="font-semibold truncate tracking-tight">{item.itemName}</p>
        <p className="text-base">{`${item.numberInStock} in stock`}</p>
      </div>
      <div className="flex flex-col items-end justify-end max-h-full h-16">
        <button className="rounded-full hover:text-slate-950">
          <LucideMoreHorizontal size={26} />
        </button>
      </div>
    </div>
  );
}
