import axios from "axios";
import { SpinLoader } from "../../components/SpinLoader";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { LucideArrowLeftCircle } from "lucide-react";
import { ItemCard } from "./ItemCard";
import { CreateItemForm } from "./CreateItemForm";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Pagination } from "@/components/Pagination";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { ItemDetailModal } from "./ItemDetailModal";

export interface ItemResponse {
  content: Item[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Item {
  id: string;
  itemName: string;
  description: string;
  categoryId: string;
  price: number;
  numberInStock: number;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export function CategoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [data] = useState(location.state);

  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 0;

  const { data: itemsResponse, isLoading } = useQuery<ItemResponse>({
    queryKey: ["get-items", page, id],
    queryFn: async () => {
      const data = axios
        .get(`http://localhost:8080/items/${id}?page=${page}&size=10`)
        .then((response) => {
          return response.data;
        });
      return data;
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });

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
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Number in stock</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itemsResponse?.content.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="h-12 w-12 rounded-md bg-slate-300 flex items-center justify-center ">
                        Img
                      </div>
                    </TableCell>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.numberInStock}</TableCell>
                    <TableCell className="text-right">
                      <ItemDetailModal item={item} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        {itemsResponse && itemsResponse?.totalElements > 0 ? (
          <Pagination
            pages={itemsResponse.totalPages}
            items={itemsResponse.totalElements}
            page={page}
          />
        ) : (
          <div className="text-md w-full text-center">
            This category has no registered items
          </div>
        )}
      </div>
    </div>
  );
}
