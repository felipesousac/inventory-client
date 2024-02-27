import { useEffect, useState } from "react";
import axios from "axios";
import { SpinLoader } from "../../components/SpinLoader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LucideArrowLeftCircle } from "lucide-react";
import { ItemCard } from "./ItemCard";
import { NewItemCard } from "./NewItemCard";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateItemForm } from "./CreateItemForm";

interface Item {
  id: string;
  itemName: string;
  description: string;
  categoriyId: string;
  categoryName: string;
  price: number;
  numberInStock: number;
}

export function CategoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/items/${id}`).then((response) => {
      setItems(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="text-[#12372A] text-2xl mx-auto flex flex-col items-center py-4 gap-3">
        <div className="grid grid-cols-3 justify-items-center items-center w-full">
          <div className="col-start-2 truncate">{data}</div>
          <button
            onClick={() => navigate("/categories")}
            className="ml-auto mr-10 hover:text-[#436850] transition-colors"
          >
            <LucideArrowLeftCircle />
          </button>
        </div>

        <div className="mb-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:opacity-100 w-full" />

        <CreateItemForm categoryId={id} />

        {isLoading ? (
          <SpinLoader />
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-4 w-4/5">
            {items.length ? (
              <>
                {items.map((item) => {
                  return <ItemCard key={item.id} item={item} />;
                })}
              </>
            ) : (
              <div className="text-md w-80 text-center">
                This category has no registered items
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
