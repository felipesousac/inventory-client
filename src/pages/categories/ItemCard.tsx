import { ItemDetailModal } from "./ItemDetailModal";

export interface ItemCardProps {
  item: {
    id: string;
    itemName: string;
    description: string;
    categoryId: string;
    price: number;
    numberInStock: number;
  };
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="w-11/12 max-w-xl flex items-center justify-between rounded-md border border-gray-400 py-2 px-3 leading-normal shadow-lg bg-white">
      <div>
        <div className="h-16 w-16 rounded-md bg-slate-300 flex items-center justify-center ">
          Img
        </div>
      </div>
      <div className="min-w-80 max-w-80">
        <p className="font-semibold text-[#12372A] truncate tracking-tight text-xl">
          {item.itemName}
        </p>
        <p className="text-base">{`${item.numberInStock} in stock`}</p>
      </div>
      <div className="flex flex-col items-end justify-end max-h-full h-16">
        <ItemDetailModal item={item} />
      </div>
    </div>
  );
}
